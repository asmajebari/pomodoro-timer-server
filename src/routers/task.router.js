const express = require("express");
const auth = require("../middleware/auth");
const {
  httpAddNewTask,
  httpGetAllTasks,
  httpDeleteTask,
  httpGetTaskById,
  httpUpdateTask,
  httpDeleteCompletedTasks
} = require("../controllers/task.controller");
const router = new express.Router();

router.post("/", auth, httpAddNewTask);

router.get("/", auth, httpGetAllTasks);


router.get("/:id", auth, httpGetTaskById);

router.patch("/:id", auth, httpUpdateTask);

router.delete("/", auth, httpDeleteCompletedTasks);

router.delete("/:id", auth, httpDeleteTask);

module.exports = router;
