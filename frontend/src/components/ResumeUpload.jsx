import { useState } from "react";
import axios from "axios";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.analysis);
    } catch (err) {
      setResult("❌ Error analyzing resume. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        marginTop: 30,
        background: "#1e293b",
        padding: 20,
        borderRadius: 10,
        color: "white",
      }}
    >
      <h2>📄 AI Resume Analyzer</h2>

      <p style={{ fontSize: 12, color: "#94a3b8" }}>
        Upload your resume and get AI-powered career insights
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button
        onClick={uploadResume}
        disabled={loading}
        style={{
          padding: "10px 18px",
          background: loading ? "#64748b" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
        }}
      >
        {loading ? "Analyzing Resume..." : "🚀 Analyze Resume with AI"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 20,
            background: "#0f172a",
            padding: 15,
            borderRadius: 10,
            border: "1px solid #334155",
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>🤖 AI Resume Analysis Report</h3>
          {result}
        </div>
      )}
    </div>
  );
}