import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./utils/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    await loginUser(formData, setIsLoading, navigate);
  };

  const toggleRegisterForm = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <p>Stranger Things</p>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </form>
      <button type="button" onClick={handleLogin}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <p>
        Not registered?{" "}
        <span className="register-link" onClick={toggleRegisterForm}>
          Click here to register
        </span>
      </p>
    </div>
  </div>
  );
};

export default LoginForm;
