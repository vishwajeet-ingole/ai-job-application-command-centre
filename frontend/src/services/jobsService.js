const API = "http://localhost:5001";

// Get Jobs
export async function getJobs() {
  const res = await fetch(`${API}/jobs`);
  return await res.json();
}

// Add Job
export async function addJob(job) {
  const res = await fetch(`${API}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  return await res.json();
}

// Update Job
export async function updateJob(id, data) {
  const res = await fetch(`${API}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

// Delete Job
export async function deleteJob(id) {
  const res = await fetch(`${API}/jobs/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}