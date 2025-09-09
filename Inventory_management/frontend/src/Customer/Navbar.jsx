import React from "react";
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    
      <nav style={{display:"flex",width:"100%",
      justifyContent:"space-between", alignItems:"center",
      boxShadow:"0 2px 6px rgba(0, 0, 0, 0.1)" ,padding:"5px 5px", /* Box shadow */
      position: "sticky",top:0, zIndex:"1000",backgroundColor:"#fff"}}>
        <h1>LOGO</h1>
        
          <div style={{
            display:"flex",gap:"20px",marginRight:"10px"
          }}>
            <input type="text" placeholder="search" style={{
              height:"25px",width:"400px",border:"1px solid #ddd",padding: "8px 12px", borderRadius: "8px",
      outline: "none",
      fontSize: "15px",
      boxShadow:"0 2px 5px rgba(0, 0, 0, 0.05)"
            }}></input>
              <Link to="/login"  style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", }}><div style={{display:"flex",alignItems:"center",flexDirection:"column",gap:"5px"}}>
                <img src="./userlogin.png" alt="login" width={"25px"} height={"25px"}/>
                <p style={{marginTop:"-2px",fontSize:"14px"}}>Login</p>
              </div></Link>
                <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{display:"flex",alignItems:"center",flexDirection:"column",gap:"5px"}}>
              <img src="./cart.png" alt="login" width={"25px"} height={"25px"}/>
                <p style={{marginTop:"-2px",fontSize:"14px"}}>Cart</p>
              </div></Link>
          </div>
      </nav>
    </>
  );
}
