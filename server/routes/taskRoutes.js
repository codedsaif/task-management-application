const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");
const auth = require("../middleware/auth.js");

router.route("/").get(getAllTasks);
router.route("/").post(auth, createTask);
router.route("/:id").patch(auth, updateTask);
router.route("/:id").delete(auth, deleteTask);
module.exports = router;
