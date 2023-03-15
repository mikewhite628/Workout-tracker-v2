import React from "react";
import { useState, useEffect } from "react";

export default function Workout() {
  const [aiResponse, setAiResponse] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [aiImage, setAiImage] = useState();

  useEffect(() => {}, []);

  const fetchData = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const data = await response.json();
    console.log(data);
    setAiResponse(data.result.split("\n"));
  };

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
    console.log(prompt);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/aiimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   prompt: prompt,
        // }),
      });
      const data = await response.json();
      console.log(data);
      setAiImage(data.result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Workout</h1>
      {aiImage && <img src={aiImage} alt="aiImage" />}
      <h2> {`Hi I'm your AI Fitness Trainer! What can I help you with?`} </h2>
      <ul>
        {aiResponse.map((workout, i) => (
          <li key={i}>{workout}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="textarea"
          placeholder={`ask your question here`}
          value={prompt}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
