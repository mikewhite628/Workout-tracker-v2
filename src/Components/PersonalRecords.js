import React, { useEffect, useState } from "react";

export default function PersonalRecords({ userWorkouts, user }) {
  const [personalRecords, setPersonalRecords] = useState([]);

  const findPersonalRecords = () => {
    const personalRecords = userWorkouts.reduce((acc, workout) => {
      if (acc[workout.name]) {
        if (acc[workout.name].weight < workout.weight) {
          acc[workout.name] = workout;
        }
      } else {
        acc[workout.name] = workout;
      }
      return acc;
    }, {});
    setPersonalRecords(personalRecords);
  };

  useEffect(() => {
    findPersonalRecords();
  }, [userWorkouts]);

  return (
    <div className="px-6">
      <h2 className="mb-2">{`Personal Records - ${user.nickname}`} </h2>
      <ul className="grid grid-cols-5">
        {Object.keys(personalRecords).map((key) => {
          return (
            <li key={key} className="flex flex-col">
              <h4 className="uppercase">{key}</h4>
              <span>
                {personalRecords[key].weight} {"lbs"}
              </span>
              <span>
                {personalRecords[key].reps} {"reps"}
              </span>
              <span>{personalRecords[key].date.toString().slice(0, 10)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
