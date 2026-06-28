import { updateJob, deleteJob, getJobs } from "../services/jobsService";

export default function ApplicationsTable({ jobs, setJobs }) {

  async function changeStatus(id, status) {
    await updateJob(id, { status });

    const updated = await getJobs();
    setJobs(updated);
  }

  async function removeJob(id) {
    await deleteJob(id);

    const updated = await getJobs();
    setJobs(updated);
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
      <h2>Recent Applications</h2>

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
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
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
    </div>
  );
}