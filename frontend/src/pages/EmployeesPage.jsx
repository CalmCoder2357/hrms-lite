import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.data);
    } catch (err) {
      setError("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/employees", form);
      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating employee");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div>
      <h2>Employees</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          required
        />
        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>

      <hr />

      {employees.length === 0 ? (
        <p>No employees yet.</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp._id}>
              {emp.employeeId} - {emp.fullName} ({emp.department})
              <button
                onClick={() => handleDelete(emp._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeesPage;