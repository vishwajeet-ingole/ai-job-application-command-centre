function cleanAIText(text = "") {
  return text
    .replace(/\*/g, "")        // remove *
    .replace(/_/g, "")         // remove _
    .replace(/`/g, "")         // remove backticks
    .replace(/#+/g, "")        // remove markdown headers
    .replace(/\s{2,}/g, " ")   // remove extra spaces
    .trim();
}

module.exports = { cleanAIText };