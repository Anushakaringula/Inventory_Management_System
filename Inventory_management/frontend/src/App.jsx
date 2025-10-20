import React, { useState, useEffect } from "react";
import Before from "./Before";
import After from "./After";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      {user ? (
        <After user={user} setUser={setUser} />
      ) : (
        <Before setUser={setUser} />
      )}
    </>
  );
}

export default App;
