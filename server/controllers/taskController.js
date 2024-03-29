const Task = require("../models/Task.js");
const User = require("../models/User.js");
const checkPermissions = require("../utils/checkPermissions.js");
const sendMails = require("../utils/sendMails.js");
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
    const users = await User.find();
    const emails = users.map((user) => user.email);
    sendMails(emails, task);

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
  try {
    let { search, status, sort, scope } = req.query;
    const queryObject = {};
    if (scope && scope !== "all") {
      if (scope.startsWith("OTHERS")) {
        // console.log("SCOPE OTHERS", scope.substring(6));
        queryObject.createdBy = { $ne: scope.substring(6) };
      } else {
        // console.log("PERSONAL SCOPE", scope);
        queryObject.createdBy = scope || "";
      }
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
      result = result.sort("name");
    }
    if (sort === "z-a") {
      result = result.sort("-name");
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
  } catch (error) {
    console.log("ERROR in getAllTasks", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    // console.log("ID GOT FORM CLIENT", taskId);
    const { name, description, date, status } = req.body;
    let updateTask = {};
    if (name) updateTask.name = name;
    if (description) updateTask.description = description;
    if (date) updateTask.date = date;
    if (status) updateTask.status = status;
    // console.log(updateTask);
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).send("Task does not exists");
    }
    // checking permissions
    if (!checkPermissions(req.user, task.createdBy)) {
      return res.status(401).send("Not authorized for this");
    }
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      updateTask,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ updatedTask });
  } catch (error) {
    console.log("UPDATE TASK ERROR", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).send("Task does not exists");
    }
    if (!checkPermissions(req.user, task.createdBy)) {
      return res.status(401).send("Not authorized for this");
    }
    await task.deleteOne();
    res.status(200).json({ msg: "Success! Task removed" });
  } catch (error) {
    console.log("DELETE TASK ERROR", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
