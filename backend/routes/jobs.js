const express = require("express");

const router = express.Router();

// Temporary in-memory store (Later we will replace with MongoDB)
let jobs = [];

// ==========================
// Add Job
// ==========================
router.post("/", (req, res) => {
  const { company, role, status } = req.body;

  const newJob = {
    id: Date.now(),
    company,
    role,
    status: status || "Applied",
  };

  jobs.push(newJob);

  res.status(201).json({
    message: "Job added successfully",
    job: newJob,
  });
});

// ==========================
// Get All Jobs
// ==========================
router.get("/", (req, res) => {
  res.status(200).json(jobs);
});

// ==========================
// Update Job
// ==========================
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  jobs = jobs.map((job) =>
    job.id === id ? { ...job, ...req.body } : job
  );

  res.status(200).json({
    message: "Job updated successfully",
  });
});

// ==========================
// Delete Job
// ==========================
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  jobs = jobs.filter((job) => job.id !== id);

  res.status(200).json({
    message: "Job deleted successfully",
  });
});

module.exports = router;