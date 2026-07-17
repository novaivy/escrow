import React, { useState } from "react";
import { login } from "../api";

const Login = ({ onLogin, goToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
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
      const response = await login({ email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* Reset & base – same as register page */
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f0f2f5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 20px;
          margin: 0;
        }

        .login-card {
          background: white;
          border-radius: 20px;
          padding: 40px 35px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
        }

        .login-card:hover {
          transform: translateY(-2px);
        }

        .login-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a2e;
          text-align: center;
          margin: 0 0 6px 0;
        }

        .login-subtitle {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 28px 0;
        }

        /* Form – vertical layout with 20px gap */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
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

        .login-input {
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

        .login-input:focus {
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
        }

        .login-input.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .login-input.error:focus {
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
        }

        .error-message {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
          padding-left: 4px;
        }

        .login-btn {
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

        .login-btn:hover {
          background: #4338ca;
        }

        .login-btn:active {
          transform: scale(0.98);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          text-align: center;
          padding-top: 10px;
          border-top: 1px solid #f3f4f6;
          margin-top: 0;
        }

        .login-footer p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .register-link-btn {
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

        .register-link-btn:hover {
          background: rgba(79, 70, 229, 0.08);
        }

        /* Mobile responsive */
        @media (max-width: 480px) {
          .login-card {
            padding: 28px 20px;
          }
          .login-title {
            font-size: 22px;
          }
          .login-input,
          .login-btn {
            font-size: 14px;
            padding: 11px 12px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="ivy@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`login-input ${errors.email ? "error" : ""}`}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className={`login-input ${errors.password ? "error" : ""}`}
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={goToRegister}
                  className="register-link-btn"
                >
                  Create one
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;