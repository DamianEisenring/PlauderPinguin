import React, { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Conversation from "./Components/Conversation";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          PlauderPinguin
          <br />
          <img
            id="plauderPinguLogo"
            src="logo192.png"
            alt="fortnite fussbilder"
          />
        </h1>

        {!loggedInUser ? (
          <Login setLoggedInUser={setLoggedInUser} />
        ) : (
          <div>
            <Conversation loggedInUser={loggedInUser} />
            <button className="button" onClick={refreshPage}>
              Logout
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
