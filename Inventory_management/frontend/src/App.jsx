// import {React,useState} from 'react';
// import Navbar from './Customer/Navbar';
// import Home from './Customer/Home';
// import Cart from './Customer/Cart';
// import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import Login from './Customer/Login';
// import Favorites from './Customer/favorites';
// import Product from './Customer/Product';


// function App() {
 
//    const [cart, setCart] = useState([]);
//    const [favorites, setFavorites] = useState([]);
//   const [user, setUser] = useState(null);

//   return (
//       <>
//       <Navbar user={user} />
//       <Routes>

//         <Route
//           path="/"
//           element={
//             <Home
//               cart={cart}
//               setCart={setCart}
//               favorites={favorites}
//               setFavorites={setFavorites}/>}/>
//         <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}/>
//         <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />}/>
//         <Route path="/favorites" element={<Favorites  favorites={favorites} setFavorites={setFavorites} />}/>
//          <Route path="/product/:id" element={
//           <Product
//             cart={cart}
//             setCart={setCart}
//             favorites={favorites}
//             setFavorites={setFavorites}
//           />
//         } />
//       </Routes>
//       </>
//   )
// }

// export default App

import React from "react";
import Navbars from "./Before/Navbars";
import Homes from "./Before/Homes";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Products from "./Before/Products";
import Login from "./Before/Login";
import Boss from "./Admin/Boss";
import Home from "./Customer/Home";
function App()
{
  return (
    <>
    <Navbars/>
      <Routes>

        <Route
          path="/"
          element={
            <Homes/>}/>
             <Route path="/product/:id" element={<Products/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/boss" element={<Boss/>}/>
              <Route path="/home" element={<Home/>}/>
      </Routes>
      </>
  )
}
export default App;