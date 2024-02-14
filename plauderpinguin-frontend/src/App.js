import React, { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Conversation from "./Components/Conversation";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PlauderPinguin</h1>

        {!loggedInUser ? (
          <Login setLoggedInUser={setLoggedInUser} />
        ) : (
          <div>
            <Conversation loggedInUser={loggedInUser} />
            <button onClick={() => setLoggedInUser(null)}>Logout</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
