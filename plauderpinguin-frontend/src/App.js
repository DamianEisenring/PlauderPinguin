import React, { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Conversation from "./Components/Conversation";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="/PlauderPinguinpng-cutout.png"
          alt="Plauderpinguin Logo"
          className="logo"
        />
        <h1>Plauderpinguin</h1>
      </header>
      
      <div className={loggedInUser ? "conversation-body" : "login-body"}>
        {loggedInUser ? (
          <Conversation loggedInUser={loggedInUser} />
        ) : (
          <Login 
            setLoggedInUser={setLoggedInUser} 
            loggedInUser={loggedInUser} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
