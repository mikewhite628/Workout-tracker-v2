import React from "react";
import { useState, useEffect } from "react";
import CloseButton from "./CloseButton";

export default function Chat() {
  const [aiResponse, setAiResponse] = useState([]);
  const [chat, setchat] = useState([
    { role: "assistant", content: "Hey there how can I help you?" },
    { role: "assistant", content: "Need anything?" },
  ]);
  const [newUserMessage, setNewUserMessage] = useState({
    role: "user",
    content: "",
  });
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [aiMessageSent, setAiMessageSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  function upDateChat() {
    if (newUserMessage.content === "") {
      return;
    }
    setUserMessageSent(true);
  }

  useEffect(() => {
    if (userMessageSent) {
      setchat([...chat, newUserMessage]);
      setUserMessageSent(false);
      clearChatInput();
      setAiMessageSent(true);
    }
  }, [userMessageSent]);

  useEffect(() => {
    if (aiMessageSent) {
      getAiResponse();
      setAiMessageSent(false);
    }
  }, [aiMessageSent]);

  async function getAiResponse() {
    const response = await fetch("/api/aichat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chat }),
    });
    const data = await response
      .json()
      .then((data) => data)
      .then((data) => {
        setchat([...chat, data.result]);
      })

      .catch((err) => console.log(err));

    return data;
  }

  function getUserMessage(e) {
    setNewUserMessage({ role: "user", content: e.target.value });
  }

  function clearChatInput() {
    setNewUserMessage({ role: "user", content: "" });
  }

  function toggleChat() {
    setChatOpen(!chatOpen);
  }

  return (
    <div
      className={`w-96 border h-96 border-2 fixed bottom-0 right-0 flex flex-col overflow-y-scroll chat ${
        chatOpen ? "active" : "inactive"
      }`}
    >
      <div
        className="h-12 bg-blue-100 p-4 flex flex-row justify-between"
        onClick={() => toggleChat()}
      >
        <h1>Chat</h1>
        {chatOpen ? <CloseButton closeItem={setChatOpen} /> : <p>Open</p>}
      </div>
      <div className="flex flex-col mb-8 p-4 chat-inner">
        {chat.map((message, i) => {
          return (
            <div key={i} className="flex flex-row">
              <div className="mr-2 mb-2">
                {message.role}: {message.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 p-2 mr-4 bg-slate-100 w-full">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Type your message here"
            onChange={(e) => getUserMessage(e)}
            value={newUserMessage.content}
            className="w-2/3 border-2 border-gray-300 p-2 rounded-lg mr-1"
          />
          <button
            onClick={upDateChat}
            className=" bg-purple-100 h-12 w-1/4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
