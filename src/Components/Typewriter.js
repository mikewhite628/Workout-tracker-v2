import React from "react";
import { useState, useEffect } from "react";

export default function Typewriter({ fullText }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [fullText]);

  return (
    <div className="chatgpt-typing-effect-container">
      <div className="chatgpt-typing-effect-text">{text}</div>
      <div className="chatgpt-typing-effect-cursor"></div>
    </div>
  );
}
