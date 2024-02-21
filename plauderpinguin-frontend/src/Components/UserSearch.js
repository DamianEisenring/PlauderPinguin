import React, { useState } from "react";
import { searchUsers } from "../Context/MessageContext";
import "./UserSearch.css";

const UserSearch = ({ onUserSelected }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchQuery);

      if (results.length > 0) {
        const selectedRecipient = results[0].username;
        onUserSelected(selectedRecipient);

        // Optionally, you can clear the searchQuery after selecting a user
        setSearchQuery("");
      } else {
        // Handle the case when no users are found
        console.log("No users found");
      }
    } catch (error) {
      console.error("Error searching users:", error);

      // Handle the error as needed
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchbar"
        placeholder="Search users..."
      />
      <button onClick={handleSearch} className="search_btn">
        Search
      </button>
      {/* Display search results as needed */}
    </div>
  );
};

export default UserSearch;
