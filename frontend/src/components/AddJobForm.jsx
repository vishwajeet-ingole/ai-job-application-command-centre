import { useState } from "react";

export default function AddJobForm({ onAdd }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  function handleSubmit(e) {
    e.preventDefault();

    if (!company || !role) return;

    onAdd({
      id: Date.now(),
      company,
      role,
      status,
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
  }

  return (
    <div
      style={{
        marginTop: 30,
        padding: 20,
        background: "#1e293b",
        borderRadius: 10,
      }}
    >
      <h2>Add New Job</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ padding: 8 }}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: 8 }}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Shortlisted</option>
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}