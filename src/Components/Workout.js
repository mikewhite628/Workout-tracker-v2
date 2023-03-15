import React from "react";
import CloseButton from "./CloseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/pro-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";

export default function workout({
  selectedDaysWorkouts,
  updatingWorkout,
  itemToUpdate,
  toggleUpdatingWorkout,
  deleteWorkout,
  updateWorkout,
  addWorkout,
  setName,
  setReps,
  setWeight,
  addingWorkout,
  setAddingWorkout,
  selectedDateString,
}) {
  console.log(selectedDaysWorkouts + "selectedDaysWorkouts");

  return (
    <div
      className={`flex flex-col absolute bg-slate-300 z-10  inset-0 mx-auto top-0 workoutmodal  text-center ${
        addingWorkout ? "active " : null
      }`}
    >
      <CloseButton itemToClose={addingWorkout} closeItem={setAddingWorkout} />
      <h3>{selectedDateString}</h3>

      <div className="grid grid-cols-4">
        <div className="col-start-1 col-end-2">Excercise Name:</div>
        <div className="col-start-2"> Weight:</div>
        <div className="col-start-3">Reps:</div>
        <div className="col-start-4">+ / -</div>
      </div>
      {selectedDaysWorkouts !== undefined
        ? selectedDaysWorkouts.map((workout) => (
            <div key={workout._id} className="grid grid-cols-4">
              <h2 className="">{workout.name}</h2>
              <p className="">{workout.weight}</p>
              <p className="">{workout.reps}</p>

              {updatingWorkout && workout._id === itemToUpdate ? (
                <div key={workout._id}>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="weight"
                    onChange={(e) => setWeight(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="reps"
                    onChange={(e) => setReps(e.target.value)}
                  ></input>
                  <button onClick={(e) => updateWorkout(workout._id)}>
                    Edit
                  </button>
                  <button onClick={(e) => toggleUpdatingWorkout(workout._id)}>
                    Cancel
                  </button>
                </div>
              ) : null}

              <div>
                <button onClick={() => deleteWorkout(workout._id)}>
                  <FontAwesomeIcon icon={faTrashCan} width={12} />
                </button>
                <button onClick={(e) => toggleUpdatingWorkout(workout._id)}>
                  <FontAwesomeIcon icon={faPenToSquare} width={12} />
                </button>
              </div>
            </div>
          ))
        : null}

      <div className="grid-cols-4 grid">
        <input
          type="text"
          placeholder="Name"
          className="border border-black mx-1"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="weight"
          className="border border-black mx-1"
          onChange={(e) => setWeight(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="reps"
          className="border border-black mx-1"
          onChange={(e) => setReps(e.target.value)}
        ></input>
        <button
          type="button"
          value="Add Workout"
          className={`border border-black mx-1`}
          onClick={addWorkout}
        >
          {"Add workout"}
        </button>
      </div>
    </div>
  );
}
