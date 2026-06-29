const express = require("express");
const router = express.Router();

/* GET Lemma safely from server */
function getLemma(req) {
  return req.app.locals.lemma;
}

/* Example route using Lemma safely */
router.get("/pods", async (req, res) => {
  try {
    const lemma = getLemma(req);

    if (!lemma || !lemma.pods) {
      return res.json({
        success: false,
        message: "Lemma not initialized",
      });
    }

    const pods = await lemma.pods.listByOrganization(
      process.env.LEMMA_ORG_ID
    );

    res.json({
      success: true,
      pods,
    });
  } catch (err) {
    console.error("Jobs route error:", err);

    res.status(500).json({
      success: false,
      error: "Failed to fetch pods",
    });
  }
});

module.exports = router;