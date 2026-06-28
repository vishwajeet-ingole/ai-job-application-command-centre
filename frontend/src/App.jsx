import { useEffect, useState } from "react";
import ApplicationsTable from "./components/ApplicationsTable";
import ChatBox from "./components/ChatBox";
import ResumeUpload from "./components/ResumeUpload";
import { getJobs, addJob } from "./services/jobsService";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [jobs, setJobs] = useState([]);

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
        setJobs(data || []);
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
      setJobs(updated || []);

      setForm({
        company: "",
        role: "",
        status: "Applied",
      });
    } catch (err) {
      console.log("Error adding job:", err);
    }
  };

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🚀 AI Career OS</h2>

        <div style={styles.menu} onClick={() => setPage("dashboard")}>
          📊 Dashboard
        </div>

        <div style={styles.menu} onClick={() => setPage("applications")}>
          📋 Applications
        </div>

        <div style={styles.menu} onClick={() => setPage("chat")}>
          🤖 AI Chat
        </div>

        <div style={styles.menu} onClick={() => setPage("settings")}>
          ⚙️ Settings
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <h1>AI Job Application Command Centre</h1>
        <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "15px",
  margin: "20px 0"
}}>
  <div style={styles.card}>
    <h3>{jobs.length}</h3>
    <p>Total Applications</p>
  </div>

  <div style={styles.card}>
    <h3>{jobs.filter(j => j.status === "Interview").length}</h3>
    <p>Interviews</p>
  </div>

  <div style={styles.card}>
    <h3>{jobs.filter(j => j.status === "Offer").length}</h3>
    <p>Offers</p>
  </div>

  <div style={styles.card}>
    <h3>{jobs.filter(j => j.status === "Rejected").length}</h3>
    <p>Rejected</p>
  </div>
</div>

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
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
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

            <ApplicationsTable jobs={jobs} setJobs={setJobs} />
          </>
        )}

        {page === "applications" && (
          <ApplicationsTable jobs={jobs} setJobs={setJobs} />
        )}

        {page === "chat" && (
          <>
            <ChatBox />
            <ResumeUpload />
          </>
        )}

        {page === "settings" && (
          <div style={styles.box}>
            ⚙️ Settings coming soon...
          </div>
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
    fontFamily: "Arial",
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

  main: {
    flex: 1,
    padding: "30px",
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
    background: "white",
  },

  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  box: {
    marginTop: "20px",
    padding: "20px",
    background: "#1e293b",
    borderRadius: "10px",
  },
  card: {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
},
};