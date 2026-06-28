import { useState } from "react";
import axios from "axios";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

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
      console.error("UPLOAD ERROR:", err);

      if (err.response) {
        console.log("Backend Error:", err.response.data);

        setResult(
          `❌ Backend Error

Status: ${err.response.status}

${JSON.stringify(err.response.data, null, 2)}`
        );
      } else if (err.request) {
        setResult(`❌ Backend not responding

${err.message}`);
      } else {
        setResult(`❌ ${err.message}`);
      }
    }
  };

  return (
    <div
      style={{
        marginTop: 30,
        background: "#1e293b",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h2>📄 AI Resume Analyzer</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button
        onClick={uploadResume}
        style={{
          padding: "10px 18px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Analyze Resume
      </button>

      {result && (
        <div
          style={{
            marginTop: 20,
            whiteSpace: "pre-wrap",
            background: "#0f172a",
            padding: 15,
            borderRadius: 8,
            color: "white",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}