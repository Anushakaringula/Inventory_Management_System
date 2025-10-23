// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function Login({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:4000/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//       const userData = data.user; // ✅ extract user from response
//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);

//       // Admin check
//       if (userData.email === "user@gmail.com" && userData.password === "code@lkg") {
//         navigate("/Boss"); // redirect to admin dashboard
//       } else {
//         navigate("/"); // redirect to regular home
//       }
//     } else {
//       alert(data.message);
//     }
//     } catch (err) {
//       console.error(err);
//       alert("Server error!");
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
//       <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "30px", border: "1px solid #ccc", borderRadius: "10px", width: "300px" }}>
//         <h2 style={{ textAlign: "center" }}>Login</h2>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
//         <button type="submit" style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>Login</button>
//         <p style={{ textAlign: "center", marginTop: "10px" }}>
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setUser }) {
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
        const userData = data.user; 
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Admin check
        if (userData.email === "user@gmail.com" && userData.password === "code@lkg") {
          navigate("/Boss");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
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
        onSubmit={handleLogin}
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "360px",
          maxWidth: "100%",
          padding: "40px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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
        <h2 style={{
          textAlign: "center",
          color: "#203a43",
          fontWeight: "600",
        }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          required
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

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Login
        </button>

        <p style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#2d3748",
        }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#486b50ff", fontWeight: "600" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
