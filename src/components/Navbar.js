import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.setItem("isLoggedIn", "");
    localStorage.setItem("role", "");
    localStorage.setItem("currentUser", JSON.stringify(""));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          E-Com UI
        </Link>

        {isLoggedIn && (
          <div>
            {/* ADMIN NAV */}
            {role === "admin" && (
              <>
                <Link className="btn btn-sm btn-light me-2" to="/admin">
                  Dashboard
                </Link>

                <Link className="btn btn-sm btn-light me-2" to="/admin-products">
                  Products
                </Link>
              </>
            )}

            {/* USER NAV */}
            {role === "user" && (
              <>
                <Link className="btn btn-sm btn-light me-2" to="/user">
                  Dashboard
                </Link>

                <Link className="btn btn-sm btn-light me-2" to="/cart">
                  Cart
                </Link>

                <Link className="btn btn-sm btn-light me-2" to="/profile">
                  Profile
                </Link>
              </>
            )}

            {/* LOGOUT */}
            <button className="btn btn-sm btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
