import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [village, setVillage] = useState("");
  const [mandal, setMandal] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password || !village || !mandal || !district || !state) {
      setError("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, village, mandal, district, state }),
});


      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f2f2f2",
    }}>
      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "40px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Signup</h2>

        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="text" placeholder="Village" value={village} onChange={(e) => setVillage(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="text" placeholder="Mandal" value={mandal} onChange={(e) => setMandal(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button type="submit" disabled={loading}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: loading ? "#6c757d" : "#28a745",
            color: "#fff",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <span style={{ color: "#28a745", cursor: "pointer" }} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;