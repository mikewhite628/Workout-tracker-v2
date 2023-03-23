import React from "react";
import CloseButton from "./CloseButton";
import Image from "next/image";

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
  name,
  weight,
  reps,
}) {
  console.log(selectedDaysWorkouts + "selectedDaysWorkouts");

  return (
    <div
      className={`flex flex-col absolute bg-slate-300 z-50  inset-0 mx-auto top-0 workoutmodal  text-center ${
        addingWorkout ? "active " : null
      }`}
    >
      <div className="text-right">
        <CloseButton itemToClose={addingWorkout} closeItem={setAddingWorkout} />
      </div>
      <h3 className="mb-6">{selectedDateString}</h3>

      <div className="grid grid-cols-4 mb-2">
        <div className="col-start-1 col-end-2 font-semibold">
          Excercise Name:
        </div>
        <div className="col-start-2 font-semibold"> Weight:</div>
        <div className="col-start-3 font-semibold">Reps:</div>
        <div className="col-start-4 font-semibold">+ / -</div>
      </div>
      {selectedDaysWorkouts !== undefined
        ? selectedDaysWorkouts.map((workout) => (
            <div key={workout._id} className="grid grid-cols-4">
              <p className="">{workout.name}</p>
              <p className="">{workout.weight}</p>
              <p className="">{workout.reps}</p>

              {updatingWorkout && workout._id === itemToUpdate ? (
                <div
                  key={workout._id}
                  className="flex flex-col mb-2 justify-center items-center"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-32"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="weight"
                    className="w-32"
                    onChange={(e) => setWeight(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="reps"
                    className="w-32"
                    onChange={(e) => setReps(e.target.value)}
                  ></input>
                  <div className="flex flex-row mt-2">
                    <button
                      onClick={(e) => updateWorkout(workout._id)}
                      className={`btn-sm w-12 mr-2`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => toggleUpdatingWorkout(workout._id)}
                      className="btn-sm w-12 danger"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}

              {updatingWorkout ? null : (
                <div className="flex flex-row justify-around my-2">
                  <button onClick={(e) => toggleUpdatingWorkout(workout._id)}>
                    <Image
                      src="/pencil.svg"
                      alt="pencil"
                      width={20}
                      height={20}
                    />
                  </button>

                  <i className="fas fa-pen-square"></i>
                  <button onClick={() => deleteWorkout(workout._id)}>
                    <i className="fas fa-trash-alt"></i>
                    <Image
                      src="/trash.svg"
                      alt="trash"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              )}
            </div>
          ))
        : null}

      <div className="grid-cols-4 grid">
        <input
          type="text"
          placeholder="Name"
          className="border border-grey text-center mx-1"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
        <input
          type="text"
          placeholder="weight"
          className="border border-grey text-center mx-1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="reps"
          className="border border-grey text-center mx-1"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        ></input>
        <button
          type="button"
          value="Add Workout"
          className={`border border-grey mx-1 btn text-xs`}
          onClick={addWorkout}
        >
          {"+"}
        </button>
      </div>
    </div>
  );
}
