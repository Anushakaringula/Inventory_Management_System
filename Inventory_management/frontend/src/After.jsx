import React, { useState } from "react";
import Navbar from "./Customer/Navbar";
import Home from "./Customer/Home";
import Cart from "./Customer/Cart";
import { Routes, Route } from "react-router-dom";
import Favorites from "./Customer/Favorites";
import Product from "./Customer/Product";
import Boss from "./Admin/Boss";

function After({ user, setUser }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <Navbar user={user} setUser={setUser} /> {/* pass user and setUser */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} setFavorites={setFavorites} />}
        />
        <Route
          path="/product/:id"
          element={
            <Product
              cart={cart}
              setCart={setCart}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/boss" element={<Boss/>} />
      </Routes>
    </>
  );
}

export default After;
