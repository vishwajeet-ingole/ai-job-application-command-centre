const express = require("express");
const router = express.Router();

const { LemmaClient } = require("lemma-sdk");
const { cleanAIText } = require("../utils/cleanAI");

// Lemma SDK instance
const lemma = new LemmaClient({
  podId: process.env.LEMMA_POD_ID,
});

let jobs = [];

/* =========================
   Lemma Workflow (SAFE + FALLBACK)
========================= */
async function careerWorkflow(type, payload) {
  console.log("🚀 Lemma Workflow Triggered:", type);

  let lemmaStatus = "restricted_mode";
  let podsFound = 0;

  try {
    // IMPORTANT: safe call (no crash)
    const pods = await lemma.pods.listByOrganization(
      process.env.LEMMA_ORG_ID
    );

    lemmaStatus = "connected";
    podsFound = Array.isArray(pods) ? pods.length : 1;

    console.log("✅ Lemma SDK Connected");
  } catch (err) {
    console.log("⚠️ Lemma restricted mode → fallback active");
  }

  return {
    provider: "Lemma SDK",
    status: lemmaStatus,
    workflow: type,
    podsFound,
    insight: cleanAIText(
      "AI workflow executed for job application. Focus on React, JavaScript, Problem Solving."
    ),
    suggestion: cleanAIText(
      "Tailor your resume keywords according to job description for better ATS score."
    ),
    timestamp: new Date().toISOString(),
  };
}

/* =========================
   ADD JOB
========================= */
router.post("/", async (req, res) => {
  const { company, role, status } = req.body;

  if (!company || !role) {
    return res.status(400).json({
      error: "Company and role are required",
    });
  }

  const newJob = {
    id: Date.now(),
    company,
    role,
    status: status || "Applied",

    priorityScore:
      role.toLowerCase().includes("engineer")
        ? 9
        : role.toLowerCase().includes("developer")
        ? 8
        : role.toLowerCase().includes("intern")
        ? 6
        : 5,

    createdAt: new Date().toISOString(),
  };

  jobs.push(newJob);

  const workflowResult = await careerWorkflow("JOB_ADDED", newJob);

  return res.status(201).json({
    message: "Job added successfully",
    job: newJob,
    workflow: workflowResult,
  });
});

/* =========================
   GET JOBS
========================= */
router.get("/", (req, res) => {
  const sortedJobs = [...jobs].sort(
    (a, b) => b.priorityScore - a.priorityScore
  );

  res.json({
    total: sortedJobs.length,
    jobs: sortedJobs,
  });
});

/* =========================
   UPDATE JOB
========================= */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  jobs = jobs.map((job) =>
    job.id === id ? { ...job, ...req.body } : job
  );

  res.json({
    message: "Job updated successfully",
  });
});

/* =========================
   DELETE JOB
========================= */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  jobs = jobs.filter((job) => job.id !== id);

  res.json({
    message: "Job deleted successfully",
  });
});

module.exports = router;