import axios from "axios";
//          `https://localhost:7232/api/auth/getMessages?username=${loggedInUser.username}&recipient=${recipientUsername}`,

export const fetchMessages = async (loggedInUser, recipientUsername) => {
  try {
    if (loggedInUser && loggedInUser.username) {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://localhost:7232/api/auth/getMessages`,
        {
          params: {
            username: loggedInUser.username,
            recipient: recipientUsername,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Request URL:", response.config.url);
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error.response ? error.response.data : error.message
    );
    return [];
  }
};
  

export const sendUserMessage = async (
    loggedInUser,
    recipientUsername,
    messageContent
  ) => {
    try {
      if (
        loggedInUser &&
        loggedInUser.username &&
        recipientUsername &&
        typeof loggedInUser.username === "string" &&
        typeof recipientUsername === "string"
      ) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://localhost:7232/api/auth/sendMessage",
          {
            Sender: loggedInUser.username,
            Receiver: recipientUsername,
            Message: messageContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("Send Message successfully");
        return response.data;
      }
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  
  

export const searchUsers = async (searchQuery) => {
  try {
    // Call the API to search for users based on the provided search string
    const response = await fetch(
      `https://localhost:7232/api/auth/search?search=${searchQuery}`
    );
    const data = await response.json();
    console.log("Login data", data);
    return data;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};
