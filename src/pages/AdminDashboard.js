import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const toggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          }
        : user
    );

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <h4 className="mb-3">Admin Dashboard</h4>

      {users.length === 0 ? (
        <p>No registered users</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-sm align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Role</th>
                <th>Status</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>

                  <td className="text-center">
                    {u.profilePic ? (
                      <img
                        src={u.profilePic}
                        alt="profile"
                        width="40"
                        height="40"
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>

                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.contact}</td>
                  <td style={{ maxWidth: "150px" }}>{u.address}</td>
                  <td>{u.dob}</td>
                  <td>{u.role}</td>

                  <td>
                    <span
                      className={`badge ${
                        u.status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  {/* Masked password */}
                  <td>{"*".repeat(8)}</td>

                  <td>
                    <button
                      className={`btn btn-sm ${
                        u.status === "Active"
                          ? "btn-danger"
                          : "btn-success"
                      }`}
                      onClick={() => toggleStatus(u.id)}
                    >
                      {u.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
