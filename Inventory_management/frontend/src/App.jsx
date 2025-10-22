import React, { useState, useEffect } from "react";
import Before from "./Before";
import After from "./After";
import Admin from "./Admin";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      {user ? (
        user.email=== "user@gmail.com"?(
          <Admin user={user} setUser={setUser}/>
        ):(
        <After user={user} setUser={setUser} />
      ) ): (


        <Before setUser={setUser} />
      )}
    </>
  );
}

export default App;
