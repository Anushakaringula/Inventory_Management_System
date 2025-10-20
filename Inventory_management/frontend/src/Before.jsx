import React from "react";
import Navbars from "./Before/Navbars";
import Homes from "./Before/Homes";
import { Routes, Route } from "react-router-dom";
import Products from "./Before/Products";
import Login from "./Before/Login";
import Boss from "./Admin/Boss";
import Signup from "./Before/Signup";

function Before({ setUser }) {
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/boss" element={<Boss />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Before;
