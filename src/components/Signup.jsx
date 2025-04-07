import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const {showAlert}=props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, cPassword } = credentials;
  
    if (password !== cPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const json = await response.json();
      console.log("Server Response:", json);
  
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        // Fetch user details using the token
const userResponse = await fetch("http://localhost:5000/api/auth/getuser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token": json.authToken
  },
});

const userJson = await userResponse.json();
localStorage.setItem("user", JSON.stringify(userJson));

        showAlert("Account created successfully!", "success");
        navigate("/home");
      } else {
        showAlert(json.error || "Signup failed. Please try again.", "warn");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      showAlert("Something went wrong. Please try again later.", "error");
    }
  };
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-4">
        <div className="container h-10 ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-8 col-xl-8">
              <div className="card text-black card shadow p-4" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-20">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Get Started</p>

                      <form className="mx-1 mx-md-2" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={credentials.name}
                              onChange={onChange}
                              className="form-control"
                              required
                              minLength={5}
                            />
                            <label className="form-label" htmlFor="name">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={credentials.email}
                              onChange={onChange}
                              className="form-control"
                              required
                            />
                            <label className="form-label" htmlFor="email">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={credentials.password}
                              onChange={onChange}
                              className="form-control"
                              required
                              minLength={5}
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="cPassword"
                              name="cPassword"
                              value={credentials.cPassword}
                              onChange={onChange}
                              className="form-control"
                              required
                            />
                            <label className="form-label" htmlFor="cPassword">Confirm your password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-1 mb-lg-2">
                          <button type="submit" className="btn btn-success btn-lg w-100" style={{ borderRadius: "20px" }}>
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Signup;
