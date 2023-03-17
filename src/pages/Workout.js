import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Typewriter from "../Components/Typewriter";

export default function Workout() {
  const [aiResponse, setAiResponse] = useState(["-.o"]);
  const [prompt, setPrompt] = useState("");
  const [aiImage, setAiImage] = useState();

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/aiimage", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       // body: JSON.stringify({
  //       //   prompt: prompt,
  //       // }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setAiImage(data.result);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/genesis.png"
          alt="genesis"
          width={250}
          height={250}
          className="instructor-container mr-12"
        />

        <div className="text-center mt-12 px-4">
          <h2>{`Hello There! I'm Genesis! What workouts help you with?`} </h2>
          <p>
            {`I give longer and more in dept answers than my fellow
            AI Trainers.. however my memory is not as sharp. `}
          </p>
        </div>
      </div>
      <div className="w-11/12 flex mx-auto m-2 p-2">
        <div className="AI-response w-full text-white p-8 text-lg">
          {/* {aiResponse.map((workout, i) => (
              <li key={i}>{`${workout}`}</li>
            ))} */}
          <Typewriter fullText={aiResponse.join(`\n`)} />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-10/12 mx-auto m-2 p-1 flex flex-row items-center justify-between workoutAI-form w-10/12"
      >
        <textarea
          type="textarea"
          placeholder={`ask your question here`}
          value={prompt}
          onChange={handleChange}
          className="w-full m-4 p-2"
        />

        <button type="submit" className="btn w-36">
          Submit
        </button>
      </form>
    </div>
  );
}
