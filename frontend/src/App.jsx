import { useState } from "react";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
    const [activeTab, setActiveTab] = useState("employees");

    return (
        <div className="container">
            <h1>HRMS Lite</h1>

            <div className="nav">
                <button onClick={() => setActiveTab("employees")}>
                    Employees
                </button>
                <button
                    onClick={() => setActiveTab("attendance")}
                    style={{ marginLeft: "10px" }}
                >
                    Attendance
                </button>
            </div>

            {activeTab === "employees" && <EmployeesPage />}
            {activeTab === "attendance" && <AttendancePage />}
            <footer style={{
                marginTop: "40px",
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280"
            }}>
                © 2026 · HRMS Lite
                <br />
  Made with love (and coffee) by Shailinya Saxena ☕            </footer>
        </div>
    );
}


export default App;