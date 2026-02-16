import React, { useState } from "react";
import { searchUsers } from "../Context/MessageContext";
import "./UserSearch.css";
import { FaSearch } from "react-icons/fa";

const UserSearch = ({ onUserSelected }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchQuery);

      if (results.length > 0) {
        const selectedRecipient = results[0].username;
        onUserSelected(selectedRecipient);

        setSearchQuery("");
      } else {
        console.log("No users found");
        alert("No users found with that username.");
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSearch();
  }}
  className="search-form"
>
  <div className="search-wrapper">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="searchbar"
      placeholder="Search users..."
    />
    <button type="submit" className="search_btn">
      <FaSearch />
    </button>
  </div>
</form>

  );
};

export default UserSearch;
