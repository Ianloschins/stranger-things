import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./utils/api";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const result = await registerUser(formData);

      if (result.success) {
        // Registration was successful
        console.log("Registration successful:", result);
        setIsLoading(false); // Stop loading
        navigate("/login"); // Redirect to the login page
      } else {
        // Registration failed
        console.error("Registration failed:", result.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="registration-container">
      <div className="registration">
        <p>Register here!</p>
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
          <button type="button" onClick={handleRegister}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <button type="button" onClick={goBack}>
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
