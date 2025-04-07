import { useEffect } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

const Navbar = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        showAlert("Logged out successfully!", "info");
        navigate("/login");
      }
    });
  };
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <strong>NoteStack</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex align-items-center" role="search">
              <Link
                className={`btn ${
                  location.pathname === "/login"
                    ? "btn-info"
                    : "btn-outline-info"
                } mx-2 px-4 py-2 rounded-pill shadow-sm`}
                to="/login"
                role="button"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </Link>
              <Link
                className={`btn ${
                  location.pathname === "/signup"
                    ? "btn-info"
                    : "btn-outline-info"
                } mx-2 px-4 py-2 rounded-pill shadow-sm`}
                to="/signup"
                role="button"
              >
                <i className="bi bi-person-plus me-2"></i> Signup
              </Link>
            </form>
          ) : (
            <div className="d-flex align-items-center">
              {/* Profile icon link */}
              <Link
                to="/profile"
                className="btn btn-outline-info me-2 rounded-circle fs-5"
              >
                <i className="bi bi-person-circle"></i>
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="btn btn-outline-light px-4 py-2 rounded-pill shadow-sm"
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
