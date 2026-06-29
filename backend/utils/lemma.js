async function initLemma() {
  try {
    const sdk = await import("lemma-sdk");

    const LemmaClient = sdk?.LemmaClient;

    if (LemmaClient) {
      lemma = new LemmaClient({
        token: process.env.LEMMA_TOKEN,
      });
    }

    console.log("✅ Lemma loaded safely");
  } catch (err) {
    console.log("⚠️ Lemma disabled (safe fallback)");
  }
}

module.exports = { initLemma, lemma };