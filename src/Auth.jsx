import React, { useState } from "react";
import { supabase } from "./lib/supabase";

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name.trim() },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Auto sign-in after signup (no email confirmation required)
    if (data.user) {
      onAuth(data.user, data.session);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      onAuth(data.user, data.session);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #e0dcd7",
    background: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    color: "#1a1a1a",
    outline: "none",
    marginBottom: "0.8rem",
    borderRadius: 2,
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", background: "#fff", border: "1px solid #e0dcd7", padding: "clamp(1.5rem, 5vw, 2.5rem)" }}>
      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "1.5rem", borderBottom: "2px solid #e0dcd7" }}>
        <button
          onClick={() => { setMode("login"); setError(""); }}
          style={{
            flex: 1, padding: "0.75rem", border: "none", background: "none",
            fontSize: "0.95rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em",
            cursor: "pointer", fontWeight: mode === "login" ? 600 : 400,
            color: mode === "login" ? "#3AAFB9" : "#aaa",
            borderBottom: mode === "login" ? "2px solid #3AAFB9" : "2px solid transparent",
            marginBottom: -2,
          }}
        >
          LOG IN
        </button>
        <button
          onClick={() => { setMode("signup"); setError(""); }}
          style={{
            flex: 1, padding: "0.75rem", border: "none", background: "none",
            fontSize: "0.95rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em",
            cursor: "pointer", fontWeight: mode === "signup" ? 600 : 400,
            color: mode === "signup" ? "#3AAFB9" : "#aaa",
            borderBottom: mode === "signup" ? "2px solid #3AAFB9" : "2px solid transparent",
            marginBottom: -2,
          }}
        >
          SIGN UP
        </button>
      </div>

      {mode === "signup" ? (
        <form onSubmit={handleSignup}>
          <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Your name</label>
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            autoFocus
          />

          <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Confirm password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <div style={{ color: "#e53e3e", fontSize: "0.9rem", marginBottom: "0.8rem" }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#3AAFB9", color: "#fff", border: "none",
              padding: "0.9rem", fontSize: "0.95rem", letterSpacing: "0.15em",
              cursor: loading ? "default" : "pointer", width: "100%",
              opacity: loading ? 0.7 : 1, fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoFocus
          />

          <label style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <div style={{ color: "#e53e3e", fontSize: "0.9rem", marginBottom: "0.8rem" }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#3AAFB9", color: "#fff", border: "none",
              padding: "0.9rem", fontSize: "0.95rem", letterSpacing: "0.15em",
              cursor: loading ? "default" : "pointer", width: "100%",
              opacity: loading ? 0.7 : 1, fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>
      )}
    </div>
  );
}
