import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status === 200) {
        alert(data.message);
        navigate("/"); // Redirect to home after successful login
      } else if (res.status === 400 && data.message === "Invalid credentials") {
        // If user email doesn't exist
        alert("User not found! Please Sign Up.");
        navigate("/Signup"); // Redirect to SignUp page
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;