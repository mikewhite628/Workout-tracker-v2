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
    // fetchData();
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
      <h1>Plan</h1>
      {hasPlan ? (
        <div>
          <h2>Here is your workout plan!</h2>
          <ul>
            {workoutPlan.map((workout, i) => (
              <li key={i}>{workout}</li>
            ))}
          </ul>
          <button>Save this plan</button>
          <button> Uhh Give Me Another </button>
        </div>
      ) : (
        <div>
          <h2> We dont have a plan for you yet, so lets make one!</h2>
          <button onClick={() => startPlan()}> Get Started </button>
        </div>
      )}

      {creatingPlan ? (
        <div className="planContainer">
          <h2>Lets figure out your fitness goals!</h2>
          <form onSubmit={handleSubmit}>
            {currentStep === 0 ? (
              <div className="stepOne step">
                <div
                  className="radio flex flex-col"
                  onChange={(e) =>
                    setPrompt({ ...prompt, goal: e.target.value })
                  }
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
            ) : null}

            {currentStep === 1 ? (
              <div>
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
            ) : null}

            {currentStep === 2 ? (
              <div className="stepTwo step">
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
              <div className="stepTwo step">
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
            {currentStep === 4 ? (
              <div className="stepThree step">
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
            ) : null}

            {currentStep === 5 ? (
              <div className="stepThree step">
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
              <div className="stepFour step">
                lets review
                <div className="flex flex-col content-center justify-center">
                  <div className="flex flex-col ">
                    <span className="flex flex-row justify-between">
                      <label>Goal</label>
                      <span>{prompt.goal}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label>Units</label>
                      <span>{prompt.units}</span>
                    </span>

                    <span className="flex flex-row justify-between	">
                      <label>Current Weight</label>
                      <span>{prompt.currentWeight}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label>Target Weight</label>
                      <span>{prompt.targetWeight}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label>Days Per Week</label>
                      <span>{prompt.daysPerWeek}</span>
                    </span>

                    <span className="flex flex-row justify-between">
                      <label>Time Per Session</label>
                      <span>{prompt.timePerSession}</span>
                    </span>
                  </div>
                </div>
                <button>Submit</button>
              </div>
            ) : null}
          </form>
        </div>
      ) : null}
    </div>
  );
}
