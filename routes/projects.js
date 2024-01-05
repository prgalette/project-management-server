const router = require("express").Router();

const Project = require("../models/Project");
const Task = require("../models/Task");

router.post("/", (req, res, next) => {
  const { title, description } = req.body;
  Project.create({ title, description, tasks: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  Project.find()
    .populate("tasks")
    .then((foundProjects) => {
      console.log("Found Projects ->", foundProjects);
      res.json(foundProjects);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;