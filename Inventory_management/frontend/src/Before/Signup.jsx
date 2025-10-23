// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [village, setVillage] = useState("");
//   const [mandal, setMandal] = useState("");
//   const [district, setDistrict] = useState("");
//   const [state, setState] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!name || !email || !password || !village || !mandal || !district || !state) {
//       setError("Please fill all fields!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:4000/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, village, mandal, district, state }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Signup successful!");
//         navigate("/login");
//       } else {
//         setError(data.message || "Signup failed!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f2f2f2" }}>
//       <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "40px", borderRadius: "12px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "350px" }}>
//         <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Signup</h2>

//         <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//         <input type="text" placeholder="Village" value={village} onChange={(e) => setVillage(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//         <input type="text" placeholder="Mandal" value={mandal} onChange={(e) => setMandal(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//         <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
//         <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//         <button type="submit" disabled={loading} style={{ padding: "12px", borderRadius: "6px", border: "none", backgroundColor: loading ? "#6c757d" : "#28a745", color: "#fff", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px" }}>
//           {loading ? "Signing up..." : "Signup"}
//         </button>

//         <p style={{ textAlign: "center", marginTop: "10px" }}>
//           Already have an account? <span style={{ color: "#28a745", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;


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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f8faf9 0%, #ffffff 100%)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "400px",
          maxWidth: "100%",
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
        }}
      >
        <h2 style={{ textAlign: "center", color: "#203a43", fontWeight: "600" }}>
          Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="text"
          placeholder="Village"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="text"
          placeholder="Mandal"
          value={mandal}
          onChange={(e) => setMandal(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #486b50ff")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            color: "white",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "15px",
            marginTop: "10px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#2d3748" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#486b50ff", fontWeight: "600", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
