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

module.exports = { createTask };
