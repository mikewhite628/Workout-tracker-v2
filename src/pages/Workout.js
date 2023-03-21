import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Typewriter from "../Components/Typewriter";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { BeatLoader } from "react-spinners";

export default function Workout({ userDB }) {
  const [aiResponse, setAiResponse] = useState(["-.o"]);
  const [prompt, setPrompt] = useState("");
  const [aiImage, setAiImage] = useState();
  const [loading, setLoading] = useState(false);

  console.log(userDB + "userDB");

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
    setLoading(false);
  };

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
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
      <div className="flex flex-col items-center justify-center mt-12">
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
          {loading ? (
            <div className="flex justify-center items-center">
              <BeatLoader size={50} color={"#ff8311"} loading={true} />
            </div>
          ) : (
            <Typewriter fullText={aiResponse.join(`\n`)} />
          )}
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

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",

  async getServerSideProps(ctx) {
    const { req, res } = ctx;
    const session = await getSession(req, res);
    const user = session.user;
    const sub = user.sub;
    const fetchDBUser = await fetch("/api/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sub }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    let db = await fetchDBUser;

    return {
      props: {
        userDB: db,
      },
    };
  },
});
