import React from "react";
import { useState, useEffect, useRef } from "react";
import CloseButton from "./CloseButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { PulseLoader } from "react-spinners";

export default function Chat() {
  const { user } = useUser();
  const [aiResponse, setAiResponse] = useState([]);
  const [chat, setchat] = useState([
    {
      role: "assistant",
      content: "Hey there how can I assist you on your fitness journey?",
    },
  ]);
  const [newUserMessage, setNewUserMessage] = useState({
    role: "user",
    content: "",
  });
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [aiMessageSent, setAiMessageSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [textareaheight, setTextareaheight] = useState(0);
  const [loading, setLoading] = useState(false);

  const chatBoxRef = useRef(null);

  function upDateChat() {
    if (newUserMessage.content === "") {
      return;
    }
    setUserMessageSent(true);
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

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
    setLoading(true);
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
        setLoading(false);
      })

      .catch((err) => console.log(err));

    return data;
  }

  function getUserMessage(e) {
    setNewUserMessage({ role: "user", content: e.target.value });
    const height = e.target.scrollHeight;
    const rowHeight = 30;
    const trows = Math.ceil(height / rowHeight) - 1;

    if (newUserMessage.content === "") {
      setTextareaheight(1);
    } else if ((trows, textareaheight)) {
      setTextareaheight(trows);
    }
  }

  function clearChatInput() {
    setNewUserMessage({ role: "user", content: "" });
  }

  function toggleChat() {
    setChatOpen(!chatOpen);
  }

  return (
    <div
      className={`w-96 border border-blue-700 h-96 fixed bottom-0 right-0 flex flex-col overflow-y-scroll chat ${
        chatOpen ? "active" : "inactive"
      }`}
    >
      <div
        className="h-12 bg-blue-700 text-white p-4 flex flex-row justify-between items-center"
        onClick={() => toggleChat()}
      >
        {loading ? (
          <PulseLoader color="#fff" size={10} margin={2} />
        ) : (
          <h4>Chat</h4>
        )}

        {chatOpen ? (
          <CloseButton closeItem={setChatOpen} />
        ) : (
          <Image
            src="/aigreet.png"
            width={40}
            height={40}
            alt="vespur"
            className="instructor-container white"
          />
        )}
      </div>
      <div className="flex flex-col mb-10 p-4 chat-inner" ref={chatBoxRef}>
        {chat.map((message, i) => {
          return (
            <div key={i} className="flex flex-row">
              <div className={`mr-2 mb-2`}>
                <span
                  className={`${
                    message.role === "assistant"
                      ? `text-blue-700 font-bold`
                      : `font-bold`
                  }`}
                >
                  {message.role === "user" ? user.nickname : "Vespur"}
                </span>
                : {message.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 p-2 mr-4 bg-blue-100 w-full">
        <div className="relative w-96 flex flex-row items-center">
          <textarea
            rows={newUserMessage.content === "" ? 1 : textareaheight}
            placeholder="Type your message here"
            onChange={(e) => getUserMessage(e)}
            value={newUserMessage.content}
            className="w-2/3 border-2 border-gray-100 p-2 rounded-lg mr-1 h-fit"
            style={{ resize: "none" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                upDateChat();
              }
            }}
          />
          <button
            onClick={upDateChat}
            className=" bg-blue-700 text-white h-12 w-1/4 rounded-lg btn"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
