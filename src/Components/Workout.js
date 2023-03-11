import React from "react";
import CloseButton from "./CloseButton";

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
}) {
  console.log(selectedDaysWorkouts + "selectedDaysWorkouts");

  return (
    <div
      className={`flex flex-col absolute bg-slate-300 z-10  inset-0 mx-auto top-0 workoutmodal ${
        addingWorkout ? "active " : null
      }`}
    >
      <CloseButton itemToClose={addingWorkout} closeItem={setAddingWorkout} />
      {selectedDaysWorkouts !== undefined
        ? selectedDaysWorkouts.map((workout) => (
            <div
              key={workout._id}
              className="flex flex-col justify-center w-48 m-auto"
            >
              <h2>{workout.name}</h2>
              <p>{workout.reps}</p>
              <p>{workout.weight}</p>
              <p>{workout.date}</p>

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

              <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
              <button onClick={(e) => toggleUpdatingWorkout(workout._id)}>
                Update
              </button>
            </div>
          ))
        : null}

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
      <input type="button" value="Add Workout" onClick={addWorkout} />
    </div>
  );
}
