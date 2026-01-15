import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (isLoggedIn) {
      role === "admin" ? navigate("/admin") : navigate("/user");
    }
  }, [navigate]);

  const handleUserLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials or user not registered");
      return;
    }

    if (user.status !== "Active") {
      alert("User is inactive. Please contact admin.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "user");
    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/user");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "admin");

    navigate("/admin");
  };

  return (
    <div className="d-flex justify-content-center mt-5 align-items-center">
      <div className="card p-4 shadow">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "user" ? "active" : ""}`}
              onClick={() => setActiveTab("user")}
            >
              🙍‍♂️ User Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              🔐 Admin Login
            </button>
          </li>
        </ul>

        {/* USER LOGIN */}
        {activeTab === "user" && (
          <form onSubmit={handleUserLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => navigate("/register")}
              >
                Register User
              </button>

              <button type="submit" className="btn btn-primary">
                Login as User
              </button>
            </div>
          </form>
        )}

        {/* ADMIN LOGIN */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value="sample.credentials@admin.com"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value="7894561230"
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login as Admin
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
