var express = require("express");
var router = express.Router();

const Task = require("../models/Task");
const Project = require("../models/Project");

router.post("/", (req, res, next) => {
  const { title, description, projectId } = req.body;
  Task.create({
    title,
    description,
    project: projectId,
  })
    .then((createdTask) => {
      console.log("New Task ->", createdTask);
      return Project.findByIdAndUpdate(
        projectId,
        {
          $push: { tasks: createdTask._id },
        },
        { new: true }
      );
    })
    .then((projectToPopulate) => {
      return projectToPopulate.populate("tasks");
    })
    .then((updatedProject) => {
      console.log("Project with new task ->", updatedProject);
      res.json(updatedProject);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;