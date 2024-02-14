import React, { useState, useEffect, useRef } from "react";
import {
  sendUserMessage,
  fetchMessages,
  searchUsers,
} from "../Context/MessageContext";
import UserSearch from "./UserSearch";
import "./Conversation.css"; // Import the CSS file

const Conversation = ({ loggedInUser }) => {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [isNewMessage, setIsNewMessage] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedInUser && recipientUsername) {
          const data = await fetchMessages(loggedInUser, recipientUsername);
          console.log("Fetched Data:", data);
          setMessages(data);

          // Scroll to the bottom only when there's a new message
          if (isNewMessage) {
            scrollToBottom();
            setIsNewMessage(false); // Reset the flag after scrolling
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const intervalId = setInterval(() => {
      console.log("Interval triggered");
      console.log("loggedInUser:", loggedInUser);
      console.log("recipientUsername:", recipientUsername);
      fetchData();
    }, 5000);

    // Initial data fetch
    fetchData();

    // Cleanup interval and scroll to bottom on component unmount
    return () => {
      clearInterval(intervalId);
      scrollToBottom();
    };
  }, [loggedInUser, recipientUsername, isNewMessage]);

  const handleSendMessage = async () => {
    try {
      const success = await sendUserMessage(
        loggedInUser,
        recipientUsername,
        messageContent
      );

      if (success) {
        // Optionally, you can fetch messages again after sending a message
        const updatedMessages = await fetchMessages(
          loggedInUser,
          recipientUsername
        );
        setMessages(updatedMessages);

        // Clear the message content
        setMessageContent("");

        // Set the flag for a new message
        setIsNewMessage(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error as needed
    }
  };

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Function to scroll to the bottom when the chat is opened
  const handleChatOpen = () => {
    scrollToBottom();
  };

  return (
    <div>
      <h2 onClick={handleChatOpen}>Conversation</h2>
      <UserSearch onUserSelected={setRecipientUsername}/>
      <div className="chat-container" ref={chatContainerRef}>
      {recipientUsername && (
        <div>
          <div>
            {messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sender === loggedInUser.username
                      ? "sender-message"
                      : "recipient-message"
                  }`}
                >
                  <strong>{message.sender}:</strong> {message.message}
                </div>
              ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              className="message-input"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send Message
            </button>
          </div>
        </div>
      )}
      </div>
      
    </div>
  );
};

export default Conversation;
