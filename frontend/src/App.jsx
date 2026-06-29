import { useEffect, useState } from "react";
import ApplicationsTable from "./components/ApplicationsTable";
import ChatBox from "./components/ChatBox";
import ResumeUpload from "./components/ResumeUpload";
import { getJobs, addJob } from "./services/jobsService";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
  });

  // ---------------- LOAD JOBS ----------------
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs || data || []);
      } catch (err) {
        console.log("Error loading jobs:", err);
      }
    };

    loadJobs();
  }, []);

  // ---------------- ADD JOB ----------------
  const handleAdd = async () => {
    if (!form.company || !form.role) return;

    try {
      await addJob(form);

      const updated = await getJobs();
      setJobs(updated.jobs || updated || []);

      setForm({
        company: "",
        role: "",
        status: "Applied",
      });
    } catch (err) {
      console.log("Error adding job:", err);
    }
  };

  // ---------------- INTRO SCREEN ----------------
  if (showIntro) {
    return (
      <div style={styles.intro}>
        <h1>🚀 AI Career OS</h1>
        <p>
          Track jobs, get AI insights, and optimize your career in one place
        </p>

        <button style={styles.button} onClick={() => setShowIntro(false)}>
          Enter Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🚀 AI Career OS</h2>

        <div
          style={{ ...styles.menu, ...(page === "dashboard" && styles.active) }}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </div>

        <div
          style={{ ...styles.menu, ...(page === "applications" && styles.active) }}
          onClick={() => setPage("applications")}
        >
          📋 Applications
        </div>

        <div
          style={{ ...styles.menu, ...(page === "chat" && styles.active) }}
          onClick={() => setPage("chat")}
        >
          🤖 AI Assistant
        </div>

        <div
          style={{ ...styles.menu, ...(page === "settings" && styles.active) }}
          onClick={() => setPage("settings")}
        >
          ⚙️ Settings
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h1>🚀 AI Career OS</h1>
          <p>Your AI-powered job application command centre</p>
        </div>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            <div style={styles.form}>
              <input
                placeholder="Company"
                value={form.company}
                onChange={(e) =>
                  setForm({ ...form, company: e.target.value })
                }
                style={styles.input}
              />

              <input
                placeholder="Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={styles.input}
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                style={styles.input}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Shortlisted</option>
              </select>

              <button onClick={handleAdd} style={styles.button}>
                Save Job
              </button>
            </div>

            <div style={styles.infoText}>
              📊 Your career progress powered by AI insights
            </div>

            <ApplicationsTable jobs={jobs} setJobs={setJobs} />
          </>
        )}

        {/* APPLICATIONS */}
        {page === "applications" && (
          <ApplicationsTable jobs={jobs} setJobs={setJobs} />
        )}

        {/* CHAT */}
        {page === "chat" && (
          <div>
            <h2>🤖 AI Career Assistant</h2>
            <p>Ask anything: resume, jobs, interview prep</p>
            <ChatBox />
            <ResumeUpload />
          </div>
        )}

        {/* SETTINGS */}
        {page === "settings" && (
          <div style={styles.box}>⚙️ Settings coming soon...</div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
  },

  intro: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
    textAlign: "center",
  },

  sidebar: {
    width: "220px",
    background: "#1e293b",
    padding: "20px",
  },

  menu: {
    padding: "10px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    background: "#111827",
  },

  active: {
    background: "#2563eb",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  header: {
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    color: "black",
  },

  button: {
    padding: "12px",
    background: "#22c55e",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },

  box: {
    padding: "20px",
    background: "#1e293b",
    borderRadius: "10px",
  },

  infoText: {
    marginBottom: "15px",
    color: "#94a3b8",
  },
};