import React, { useState, useEffect, useRef } from "react";
import {
  sendUserMessage,
  fetchMessages,
  fetchUserChats,
} from "../Context/MessageContext";
import UserSearch from "./UserSearch";
import "./Conversation.css";

const Conversation = ({ loggedInUser }) => {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [isNewMessage, setIsNewMessage] = useState(false);
  const chatContainerRef = useRef(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedInUser && recipientUsername) {
          const data = await fetchMessages(loggedInUser, recipientUsername);
          console.log("Fetched Data:", data);
          setMessages(data);

          if (isNewMessage) {
            scrollToBottom();
            setIsNewMessage(false);
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

  useEffect(() => {
    const loadChats = async () => {
      if (!loggedInUser) return;

      try {
        const data = await fetchUserChats(loggedInUser);
        console.log("Chats:", data);
        setChats(data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    loadChats();
  }, [loggedInUser]);

  const handleSendMessage = async () => {
    try {
      const success = await sendUserMessage(
        loggedInUser,
        recipientUsername,
        messageContent,
      );

      if (success) {
        // Optionally, you can fetch messages again after sending a message
        const updatedMessages = await fetchMessages(
          loggedInUser,
          recipientUsername,
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

  const handleChatSelect = async (username) => {
    setRecipientUsername(username);

    try {
      const data = await fetchMessages(loggedInUser, username);
      setMessages(data);

      // kleines Timeout, damit DOM schon gerendert ist
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    } catch (err) {
      console.error("Error opening chat:", err);
    }
  };

  return (
    <div className="conversation-container">
      <div className="chat-sidebar">
        <UserSearch
          onUserSelected={setRecipientUsername}
          className="user-search"
        />
        {chats.map((chat, index) => (
          <div
            key={chat.sender || index}
            className={`chat-item ${
              recipientUsername === chat.sender ? "active" : ""
            }`}
            onClick={() => handleChatSelect(chat.sender)}
          >
            {chat.sender}
          </div>
        ))}
      </div>

      <div className="chat-main" ref={chatContainerRef}>
        <h2 onClick={handleChatOpen}>{recipientUsername}</h2>

        {recipientUsername && (
          <>
            <div className="messages-list">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${
                    msg.sender === loggedInUser.username
                      ? "sender-message"
                      : "recipient-message"
                  }`}
                >
                  <strong>{msg.sender}: </strong>
                  {msg.message}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="input-area"
            >
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="message-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Conversation;
