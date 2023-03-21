import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Typewriter from "@/Components/Typewriter";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { PulseLoader } from "react-spinners";

export default function Plan({ userDB }) {
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [prompt, setPrompt] = useState({
    goal: "",
    currentWeight: "",
    targetWeight: "",
    daysPerWeek: "",
    timePerSession: "",
    units: "",
  });
  const [hasPlan, setHasPlan] = useState(false);
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [saveButtonPressed, setSaveButtonPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(userDB[0]._id);

  function startPlan() {
    setCreatingPlan(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(prompt);
    fetchData();
    setHasPlan(true);
    setWorkoutPlan([]);
    setCreatingPlan(false);
  }

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/workoutplan", {
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
    setWorkoutPlan(data.result.split("\n"));
    setLoading(false);
  };

  function nextStep() {
    setCurrentStep(currentStep + 1);
    console.log(currentStep);
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
    console.log(currentStep);
  }

  useEffect(() => {
    completeStep();
  }, [prompt]);

  function completeStep() {
    switch (currentStep) {
      case 0:
        if (prompt.goal !== "") nextStep();
        break;
      case 1:
        if (prompt.units !== "") nextStep();

        break;
      case 4:
        if (prompt.daysPerWeek !== "") nextStep();
        break;
      case 5:
        if (prompt.timePerSession !== "") nextStep();
        break;
      default:
        break;
    }
  }

  //save plan to db for user by id
  function savePlan() {
    setSaveButtonPressed(true);
    axios
      .post(`/api/saveplan/${userDB[0]._id}`, {
        plan: workoutPlan,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("saved plan to db");
  }

  //load plan from db from user by id
  function loadPlan() {
    let plan = userDB[0].plan;
    if (plan) {
      setWorkoutPlan(plan);
      setHasPlan(true);
      setSaveButtonPressed(true);
    }
    console.log("checked for plan in db, found nothing");
  }

  useEffect(() => {
    loadPlan();
  }, []);

  function generateNewPlan() {
    setHasPlan(false);
    setCreatingPlan(true);
    setCurrentStep(0);
    setSaveButtonPressed(false);
    console.log("generating new plan");
  }
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <Image
        src="/trinity.png"
        width={250}
        height={250}
        alt="trinity"
        className="instructor-container mb-12"
      />
      <h2>{`Yo I'm Trinity! Lets Get You A Little More Structured`} </h2>
      <h1 className="text-center">{`Your Workout Plan`}</h1>
      {hasPlan ? (
        <div className="flex flex-col w-full">
          {/* <ul>
            {workoutPlan.map((workout, i) => (
              <li key={i}>{workout}</li>
            ))}
          </ul> */}
          <div className="w-11/12 flex mx-auto m-2 p-2">
            <div className="AI-response w-full text-white p-8 text-lg">
              {loading ? (
                <PulseLoader color="#fefea9" size={10} margin={2} />
              ) : (
                <Typewriter fullText={workoutPlan.join("\n")} />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            {saveButtonPressed ? (
              <button className="btn mr-12 px-3">Plan Saved!</button>
            ) : (
              <button className="btn mr-12 px-3" onClick={() => savePlan()}>
                Save this plan
              </button>
            )}

            <button className="btn px-3" onClick={() => generateNewPlan()}>
              {`Uhh Give Me Another`}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center pb-2">
          <h2 className="mb-6">
            {"We dont have a plan for you yet, so lets make one! "}
          </h2>
          {creatingPlan ? null : (
            <button
              className="btn w-42 px-6 mx-auto"
              onClick={() => startPlan()}
            >
              {"Get Started"}
            </button>
          )}
        </div>
      )}

      {creatingPlan ? (
        <div className="planContainer">
          <h2 className="mb-2">Lets figure out your fitness goals!</h2>
          <form onSubmit={handleSubmit}>
            <div className={`${currentStep === 0 ? `active` : null} step`}>
              <div
                className="radio flex flex-col"
                onChange={(e) => setPrompt({ ...prompt, goal: e.target.value })}
              >
                <div className="flex flex-row justify-between">
                  <label>I want to lose weight</label>
                  <input
                    type="radio"
                    value="I want to lose weight"
                    name="goal"
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <label>I want to gain weight and muscle</label>
                  <input
                    type="radio"
                    value="I want to gain weight and muscle"
                    name="goal"
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <label>I want to get stronger</label>
                  <input
                    type="radio"
                    value="I want to get stronger"
                    name="goal"
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <label>I want to maintain and lean out</label>
                  <input
                    type="radio"
                    value="I want to maintain and lean out"
                    name="goal"
                  />
                </div>
              </div>
            </div>

            <div className={`${currentStep === 1 ? `active` : null} step`}>
              <label>Are you a pounds person or kilograms?</label>
              <select
                name="units"
                onChange={(e) =>
                  setPrompt({ ...prompt, units: e.target.value })
                }
                className="w-52 mt-2"
              >
                <option value="">Select</option>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>

            {currentStep === 2 ? (
              <div className={`${currentStep === 2 ? `active` : null} step`}>
                <div className="radio flex flex-col">
                  <div>
                    <label>What is your current weight</label>
                    <input
                      type="number"
                      name="weight"
                      placeholder="current weight"
                      value={prompt.currentWeight}
                      onChange={(e) =>
                        setPrompt({ ...prompt, currentWeight: e.target.value })
                      }
                      className="mt-2 mr-2"
                    />
                    <span>{prompt.units}</span>
                  </div>
                  <button onClick={nextStep} className="btn mt-5 w-44 mx-auto">
                    Next
                  </button>
                </div>
              </div>
            ) : null}
            {currentStep === 3 ? (
              <div className={`${currentStep === 3 ? `active` : null} step`}>
                <div className="radio flex flex-col">
                  <div>
                    <label>What is your target weight</label>
                    <input
                      type="number"
                      name="weight"
                      placeholder="target weight"
                      value={prompt.targetWeight}
                      onChange={(e) =>
                        setPrompt({ ...prompt, targetWeight: e.target.value })
                      }
                      className="mt-2 mr-2"
                    />
                    <span>{prompt.units}</span>
                  </div>
                  <button onClick={nextStep} className="btn mt-5 w-44 mx-auto">
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            <div className={`${currentStep === 4 ? `active` : null} step`}>
              <div className="radio flex flex-col">
                <div className="flex flex-col">
                  <label className="mb-2">
                    {" How many days a week can you workout? "}
                  </label>
                  <select
                    onChange={(e) =>
                      setPrompt({ ...prompt, daysPerWeek: e.target.value })
                    }
                    className="w-52 mt-2"
                  >
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                  </select>
                </div>
              </div>
            </div>

            {currentStep === 5 ? (
              <div className={`${currentStep === 5 ? `active` : null} step`}>
                <div className="radio flex flex-col">
                  <div className="flex flex-col">
                    <label className="mb-2">
                      {"For how much time are you able to workout per session?"}
                    </label>
                    <select
                      onChange={(e) =>
                        setPrompt({ ...prompt, timePerSession: e.target.value })
                      }
                      className="w-52 mt-2"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="75">75 minutes</option>
                      <option value="90">90+ minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : null}

            {currentStep === 6 ? (
              <div className={`${currentStep === 6 ? `active` : null} step`}>
                <h3 className="text-center">To Review...</h3>
                <div className="flex flex-col content-center justify-center">
                  <div className="flex flex-col ">
                    <span className="flex flex-row justify-between">
                      <label className="font-bold">Goal:</label>
                      <span>{prompt.goal}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label className="font-bold">Units:</label>
                      <span>{prompt.units}</span>
                    </span>

                    <span className="flex flex-row justify-between	">
                      <label className="font-bold">Current Weight:</label>
                      <span>{prompt.currentWeight}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label className="font-bold">Target Weight:</label>
                      <span>{prompt.targetWeight}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label className="font-bold">Days Per Week:</label>
                      <span>{prompt.daysPerWeek}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label className="font-bold">Time Per Session:</label>
                      <span>{prompt.timePerSession}</span>
                    </span>
                  </div>
                </div>
                <button className="btn w-36 mx-auto mt-6">Submit</button>
              </div>
            ) : null}
          </form>
        </div>
      ) : null}
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

    const fetchDBUser = await fetch(
      "https://www.aifitnesstrainer.io/api/getuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sub }),
      }
    )
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
