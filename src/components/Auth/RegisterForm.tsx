import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../services/authService";
import "./AuthForm.css";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validatePassword = (pwd: string): string => {
    if (pwd.length < 6) return "Password must be at least 6 characters long.";
    if (!/^[a-zA-Z]/.test(pwd)) return "Password must start with an alphabet letter.";
    if (!/^[a-zA-Z0-9@#$_-]+$/.test(pwd)) return "Only alphanumeric and @, #, $, _, - are allowed.";
    if (!/[@#$_-]/.test(pwd)) return "Password must include at least one special character (@, #, $, _, -).";
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const validationMsg = validatePassword(pwd);
    setPasswordError(validationMsg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const pwdValidationMsg = validatePassword(password);
    if (pwdValidationMsg) {
      setPasswordError(pwdValidationMsg);
      return;
    }

    setLoading(true);

    try {
      const success = await registerUser(username, email, password);
      if (success) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err: any) {
      const backendError = err.response?.data || "Registration error.";
      setError(typeof backendError === "string" ? backendError : backendError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
