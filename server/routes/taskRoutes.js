const express = require("express");
const router = express.Router();

const { createTask, getAllTasks } = require("../controllers/taskController.js");
const auth = require("../middleware/auth.js");

router.route("/").get(getAllTasks);
router.route("/").post(auth, createTask);
module.exports = router;
