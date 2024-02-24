const Task = require("../models/Task.js");

const createTask = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Please provide all values" });
    }

    const taskAlreadyExists = await Task.findOne({ name });

    if (taskAlreadyExists) {
      return res.status(409).json({ error: "Task already exist" });
    }
    let createdBy = req.user._id;
    const task = await Task.create({ name, description, createdBy });

    res.status(201).json({
      task,
    });
  } catch (error) {
    // Handling unexpected errors
    console.error("Error in creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTasks = async (req, res) => {
  const { search, status, sort, scope } = req.query;
  const queryObject = {};
  if (scope && scope !== "all") {
    queryObject.createdBy = scope;
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  let result = Task.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const tasks = await result;
  const totalTasks = await Task.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTasks / limit);
  res.status(200).json({ tasks, totalTasks, numOfPages });
};

module.exports = { createTask, getAllTasks };
