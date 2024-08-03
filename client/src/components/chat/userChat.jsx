import React, { useEffect, useState, useRef } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { axiosInstance } from "../../pages/auth/authApi";
import { selectUserInfo } from "../../pages/auth/authSlice";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const Chat = () => {
  const user = useSelector(selectUserInfo);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollAreaRef = useRef(null);
  const socketRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      const data = {
        sender: user._id,
        content: newMessage,
        chat: chatId,
        sender_name: user.userName,
        sender_role: user.role,
      };

      // Emit the message through the socket
      
      await axiosInstance.post("api/message", data);
      setNewMessage("");
      socketRef.current.emit("new_message", data);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axiosInstance.get(`api/user/${user._id}`);
      setMessages(res.data);
    };

    const createChat = async () => {
      const data = {
        user: user?._id,
        admin: "66a155abdbdf042e2fd4646d",
      };
      const res = await axiosInstance.post("api/chat", data);
      setChatId(res.data.chatId);
      fetchMessages();
    };

    if (user) {
      createChat();
    }
  }, [user]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  useEffect(() => {
    // Initialize Socket.io connection
    socketRef.current = io("http://localhost:8080"); // Replace with your server URL

    // Handle incoming messages
    socketRef.current.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Handle user connected
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
    });

    // Handle user disconnected
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      {!isChatOpen && (
        <div onClick={toggleChat} className="fixed bottom-8 right-8 z-50">
          <button className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.5 13.5h7v-1h-7zm0-3h11v-1h-11zm0-3h11v-1h-11zM3 20.077V4.616q0-.691.463-1.153T4.615 3h14.77q.69 0 1.152.463T21 4.616v10.769q0 .69-.463 1.153T19.385 17H6.077zM5.65 16h13.735q.23 0 .423-.192t.192-.423V4.615q0-.23-.192-.423T19.385 4H4.615q-.23 0-.423.192T4 4.615v13.03zM4 16V4z"
              />
            </svg>
          </button>
        </div>
      )}

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 " onClick={toggleChat}></div>
          <Card className="fixed bottom-0 z-50 right-4 w-96 bg-background h-[500px] rounded-lg transition-transform transform translate-y-0">
            <div className="bg-blue-500 text-white p-2 flex justify-between items-center">
              <h3 className="text-lg">Contact Support </h3>
              <button onClick={toggleChat} className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={scrollAreaRef}
              className="p-3"
              style={{
                height: "396px",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
                msOverflowStyle: "auto",
              }}
            >
              {messages.map((message, index) => (
                <div key={message.id} className="mb-2">
                  {message.sender_id !== user?._id ? (
                    <div className="flex items-center">
                      <div className="bg-card shadow border rounded-md p-2">
                        <p className="pr-6">{message.content}</p>
                        <p className="text-xs text-muted-foreground text-end">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end justify-end space-x-2 my-2">
                      <div className="bg-muted shadow border rounded-md p-2">
                        <p className="pr-6">{message.content}</p>
                        <p className="text-xs text-muted-foreground text-end">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={sendMessage}
                type="text"
                className="h-14 w-full focus-visible:ring-0 focus-visible:ring-0"
                placeholder="Type a message..."
              />
              <div
                onClick={sendMessage}
                className="absolute right-0 top-3 right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4 18.5v-13L19.423 12zM5 17l11.85-5L5 7v3.885L9.846 12 5 13.116zm0 0V7z"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Chat;
