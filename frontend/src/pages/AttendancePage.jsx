import { useState } from "react";
import API from "../services/api";

function AttendancePage() {
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const handleMark = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/attendance", form);
      alert("Attendance marked");
    } catch (err) {
      setError(err.response?.data?.message || "Error marking attendance");
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await API.get(`/attendance/${form.employeeId}`);
      setRecords(res.data.data);
    } catch {
      setError("Failed to fetch attendance");
    }
  };

  return (
    <div>
      <h2>Attendance</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleMark}>
        <input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>

      <button onClick={fetchRecords} style={{ marginTop: "10px" }}>
        View Records
      </button>

      {records.length > 0 && (
        <ul>
          {records.map((rec) => (
            <li key={rec._id}>
              {new Date(rec.date).toLocaleDateString()} - {rec.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AttendancePage;