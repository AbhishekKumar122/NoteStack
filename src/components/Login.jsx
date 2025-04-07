import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    const json = await response.json();
    console.log("server response: ", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      
    //  Save user details
      // Fetch user details
    const userResponse = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": json.authToken
      },
    });

    const userJson = await userResponse.json();
    localStorage.setItem("user", JSON.stringify(userJson));
    
      navigate("/home");
      props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("Please login with correct credentials.", "error");

    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}>
        <h3 className="text-center mb-4 h2 fw-bold  mx-md-4 mt-4">Login to NoteStack</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" 
          className="btn btn-success btn-md w-100" style={{ borderRadius: "20px" }}>
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
