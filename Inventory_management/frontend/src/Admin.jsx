import React, { useState } from "react";

import { Routes, Route,Navigate } from "react-router-dom";
import Boss from "./Admin/Boss";
import Navbar3 from "./Admin/Navbar3";


function Admin({ user, setUser }) {
 

  return (
    <>
      <Navbar3 user={user} setUser={setUser} /> {/* pass user and setUser */}
      <Routes>
        <Route
          path="/"
          element={<Navigate to="boss" replace/>} />
        
       
        
        <Route path="boss" element={<Boss user={user} setUser={setUser}/>} />
      </Routes>
    </>
  );
}

export default Admin;
