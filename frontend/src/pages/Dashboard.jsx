import { useState } from "react";
import { Briefcase, FileText, MessageSquare, CheckCircle } from "lucide-react";

import ApplicationsTable from "../components/ApplicationsTable";
import AddJobForm from "../components/AddJobForm";

export default function Dashboard() {
  const [jobs, setJobs] = useState([
    { company: "Google", role: "SDE", status: "Applied" },
    { company: "Microsoft", role: "Frontend", status: "Interview" },
  ]);

  function addJob(job) {
    setJobs([job, ...jobs]);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "34px", fontWeight: "bold" }}>
        AI Job Application Command Centre
      </h1>

      <p style={{ color: "#94a3b8", marginTop: 10 }}>
        Manage your job search with AI
      </p>

      {/* Cards (same old) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <Card icon={<Briefcase />} title="Applications" value="24" />
        <Card icon={<MessageSquare />} title="Interviews" value="5" />
        <Card icon={<FileText />} title="Resume Versions" value="9" />
        <Card icon={<CheckCircle />} title="Follow Ups" value="7" />
      </div>

      {/* TABLE */}
      <ApplicationsTable jobs={jobs} />

      {/* ADD FORM */}
      <AddJobForm onAdd={addJob} />

      {/* AI Suggestions (same old static) */}
      <div
        style={{
          marginTop: "30px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>AI Suggestions</h2>
        <ul>
          <li>✔ Update Backend Resume</li>
          <li>✔ Follow up with recruiter</li>
          <li>✔ Practice DSA</li>
        </ul>
      </div>
    </div>
  );
}