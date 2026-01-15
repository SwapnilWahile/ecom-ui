import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    dob: "",
    password: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === form.email)) {
      alert("User already registered");
      return;
    }

    users.push({
      id: Date.now(),
      ...form,
      role: "user",
      status: "Active",
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    navigate("/");
  };

  return (
    <div className="card p-4">
      <h4>User Registration</h4>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="contact"
          placeholder="Contact"
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="date"
          name="dob"
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control mb-2"
          name="address"
          placeholder="Address"
          rows="3"
          onChange={handleChange}
          required
        />

        {/* PROFILE PIC */}
        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleImageUpload}
        />

        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
