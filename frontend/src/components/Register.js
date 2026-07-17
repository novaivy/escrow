import React, { useState } from "react";
import { register } from "../api";

const Register = ({ onRegistered, goToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await register(formData);
      alert("Registration successful. Please login.");
      onRegistered();
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* Reset and base */
        .register-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f0f2f5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 20px;
          margin: 0;
        }

        .register-card {
          background: white;
          border-radius: 20px;
          padding: 40px 35px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
        }

        .register-card:hover {
          transform: translateY(-2px);
        }

        .register-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a2e;
          text-align: center;
          margin: 0 0 6px 0;
        }

        .register-subtitle {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 28px 0;
        }

        /* Form – vertical layout with 20px gap between all children */
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 20px; /* consistent gap between every element */
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .register-input,
        .register-select {
          padding: 12px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          background: #fafbfc;
          transition: all 0.25s ease;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          color: #1a1a2e;
        }

        .register-input:focus,
        .register-select:focus {
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
        }

        .register-input.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .register-input.error:focus {
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
        }

        .register-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }

        .error-message {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
          padding-left: 4px;
        }

        .password-hint {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 4px;
          padding-left: 4px;
        }

        .register-btn {
          padding: 14px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          margin-top: 4px;
        }

        .register-btn:hover {
          background: #4338ca;
        }

        .register-btn:active {
          transform: scale(0.98);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .register-footer {
          text-align: center;
          padding-top: 10px;
          border-top: 1px solid #f3f4f6;
          margin-top: 0; /* gap already handled by form gap */
        }

        .register-footer p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .login-link-btn {
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .login-link-btn:hover {
          background: rgba(79, 70, 229, 0.08);
        }

        /* Mobile responsive */
        @media (max-width: 480px) {
          .register-card {
            padding: 28px 20px;
          }
          .register-title {
            font-size: 22px;
          }
          .register-input,
          .register-select,
          .register-btn {
            font-size: 14px;
            padding: 11px 12px;
          }
        }
      `}</style>

      <div className="register-page">
        <div className="register-card">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join us and start exploring</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ivy Nova"
                value={formData.name}
                onChange={handleChange}
                className={`register-input ${errors.name ? "error" : ""}`}
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ivy@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`register-input ${errors.email ? "error" : ""}`}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`register-input ${errors.password ? "error" : ""}`}
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              {!errors.password && formData.password.length > 0 && (
                <span className="password-hint">
                  {formData.password.length < 6
                    ? "Minimum 6 characters"
                    : "✓ Strong enough"}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">I want to</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="register-select"
              >
                <option value="buyer"> Buy products</option>
                <option value="seller"> Sell products</option>
              </select>
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            <div className="register-footer">
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={goToLogin}
                  className="login-link-btn"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;