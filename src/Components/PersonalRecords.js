import React, { useEffect, useState } from "react";

export default function PersonalRecords({ userWorkouts }) {
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
    console.log(personalRecords);
  };

  useEffect(() => {
    findPersonalRecords();
  }, [userWorkouts]);

  return (
    <div>
      <h3>Personal Records </h3>
      <ul>
        {Object.keys(personalRecords).map((key) => {
          return (
            <li key={key}>
              {key} - {personalRecords[key].weight} lbs
            </li>
          );
        })}
      </ul>
    </div>
  );
}
