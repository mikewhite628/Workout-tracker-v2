import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Plan() {
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

  function startPlan() {
    setCreatingPlan(true);
  }

  useEffect(() => {}, [hasPlan]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(prompt);
    fetchData();
    setHasPlan(true);
    setCreatingPlan(false);
  }

  const fetchData = async () => {
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

  return (
    <div>
      <h1 className="text-center">{`Your Workout Plan`}</h1>
      {hasPlan ? (
        <div>
          <h2>Here is your workout plan!</h2>
          <ul>
            {workoutPlan.map((workout, i) => (
              <li key={i}>{workout}</li>
            ))}
          </ul>
          <button className="btn">Save this plan</button>
          <button className="btn"> Uhh Give Me Another </button>
        </div>
      ) : (
        <div className="text-center pb-24">
          <h2 className="mb-6">
            {" "}
            We dont have a plan for you yet, so lets make one!
          </h2>
          <button className="btn w-42 px-6 mx-auto" onClick={() => startPlan()}>
            {"Get Started"}
          </button>
        </div>
      )}

      {creatingPlan ? (
        <div className="planContainer">
          <h2>Lets figure out your fitness goals!</h2>
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
                    />
                    <span>{prompt.units}</span>
                  </div>
                  <button onClick={nextStep}>Next</button>
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
                    />
                    <span>{prompt.units}</span>
                  </div>
                  <button onClick={nextStep}>Next</button>
                </div>
              </div>
            ) : null}

            <div className={`${currentStep === 4 ? `active` : null} step`}>
              <div className="radio flex flex-col">
                <div>
                  <label> How many days a week can you workout?</label>
                  <select
                    onChange={(e) =>
                      setPrompt({ ...prompt, daysPerWeek: e.target.value })
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </div>
              </div>
            </div>

            {currentStep === 5 ? (
              <div className={`${currentStep === 5 ? `active` : null} step`}>
                <div className="radio flex flex-col">
                  <div>
                    <label>
                      {"For how much time are you able to workout per session?"}
                    </label>
                    <select
                      onChange={(e) =>
                        setPrompt({ ...prompt, timePerSession: e.target.value })
                      }
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
