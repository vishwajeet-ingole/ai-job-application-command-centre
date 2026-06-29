import { updateJob, deleteJob, getJobs } from "../services/jobsService";

export default function ApplicationsTable({ jobs, setJobs }) {
  async function changeStatus(id, status) {
    await updateJob(id, { status });

    const updated = await getJobs();
    setJobs(updated.jobs || []);
  }

  async function removeJob(id) {
    await deleteJob(id);

    const updated = await getJobs();
    setJobs(updated.jobs || []);
  }

  return (
    <div
      style={{
        marginTop: 20,
        background: "#1e293b",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h2>📋 Recent Applications</h2>

      {jobs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            background: "#0f172a",
            borderRadius: "10px",
            marginTop: "15px",
            color: "#cbd5e1",
          }}
        >
          <h3>📭 No Applications Yet</h3>
          <p>
            Add your first job application to start tracking your career
            journey.
          </p>
        </div>
      ) : (
        <table style={{ width: "100%", marginTop: 10 }}>
          <thead>
            <tr>
              <th align="left">Company</th>
              <th align="left">Role</th>
              <th align="left">Status</th>
              <th align="left">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.role}</td>

                <td>
                  <select
                    value={job.status}
                    onChange={(e) => changeStatus(job.id, e.target.value)}
                    style={{
                      color: "black",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Shortlisted</option>
                    <option>Rejected</option>
                    <option>Offer</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => removeJob(job.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}