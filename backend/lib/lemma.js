const express = require("express");
const router = express.Router();
const { getLemmaClient } = require("../lib/lemma");

/* ---------------- GET JOBS FROM LEMMA ---------------- */
router.get("/jobs", async (req, res) => {
  try {
    const client = await getLemmaClient();

    const data = await client.records.list("jobs");

    res.json(data.items || []);
  } catch (err) {
    console.log("GET jobs error:", err);
    res.status(500).json({ error: "Failed to fetch jobs from Lemma" });
  }
});

/* ---------------- ADD JOB TO LEMMA ---------------- */
router.post("/jobs", async (req, res) => {
  try {
    const { company, role, status } = req.body;

    const client = await getLemmaClient();

    const newJob = await client.records.create("jobs", {
      company,
      role,
      status,
    });

    res.json(newJob);
  } catch (err) {
    console.log("POST jobs error:", err);
    res.status(500).json({ error: "Failed to add job to Lemma" });
  }
});

module.exports = router;