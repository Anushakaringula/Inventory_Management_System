import {React,useState} from 'react';
import Navbar from './Customer/Navbar';
import Home from './Customer/Home';
import Cart from './Customer/Cart';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './Customer/Login';


function App() {
 
   const [cart, setCart] = useState([]);
   const [favorites, setFavorites] = useState({});
  const [user, setUser] = useState(null);

  return (
      <>
      <Navbar user={user} />
      <Routes>

        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              favorites={favorites}
              setFavorites={setFavorites}/>}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}/>
        <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />}/>

      </Routes>
      </>
  )
}

export default App
