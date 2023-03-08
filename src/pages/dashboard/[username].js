import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  useUser,
  withPageAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/client";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

export default withPageAuthRequired(function Dashboard() {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [value, onChange] = useState(new Date());
  const [fetched, setFetched] = useState(false);
  const [updatingWorkout, setUpdatingWorkout] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState([]);
  const [selectedDaysWorkouts, setSelectedDaysWorkouts] = useState([{}]);

  const { user, error, isLoading } = useUser();

  //get user workouts
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3001/api/workouts/${user.sub}`
      );
      setUserWorkouts(result.data);
      setFetched(true);
    };
    fetchData();
  }, [fetched, user.sub]);

  //add new workout
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedDate, setSelectedDate] = useState();

  const addWorkout = async (e, date) => {
    e.preventDefault();
    const workout = {
      name: name,
      reps: reps,
      weight: weight,
      user: user.sub,
    };

    axios
      .post("http://localhost:3001/api/add", workout)
      .then((res) => {
        console.log(res.data);
        setFetched(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete workout
  const deleteWorkout = async (id) => {
    axios
      .delete(`http://localhost:3001/api/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setFetched(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //update workout
  const updateWorkout = async (id) => {
    const workout = {
      name: name,
      reps: reps,
      weight: weight,
      user: user.sub,
    };

    axios
      .put(`http://localhost:3001/api/update/${id}`, workout)
      .then((res) => {
        console.log(res.data);
        setFetched(false);
        toggleUpdatingWorkout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleUpdatingWorkout = (id) => {
    setUpdatingWorkout(!updatingWorkout);
    setItemToUpdate(id);
    console.log(itemToUpdate);
  };

  useEffect(() => {
    selectDate();
  }, [value, fetched]);

  //select calendar date
  const selectDate = (e) => {
    setSelectedDate(value);
    const trimmedDate = value.toString().slice(0, 10);

    //view workouts on that date
    const selectedDateWorkouts = userWorkouts.filter(
      (workout) => workout.date.slice(0, 10) === trimmedDate
    );
    setSelectedDaysWorkouts(selectedDateWorkouts);

    console.log(value);
    console.log(selectedDaysWorkouts);
  };

  const addClassForWorkouts = (date) => {
    const trimmedDate = date.toString().slice(0, 10);
    const selectedDateWorkouts = userWorkouts.filter(
      (workout) => workout.date.slice(0, 10) === trimmedDate
    );

    if (selectedDateWorkouts.length > 0) {
      return "hasWorkouts bg-green-500";
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>

      <Calendar
        onChange={onChange}
        showWeekNumbers
        value={value}
        onClickDay={() => selectDate()}
        //add class if selected date has workouts
        tileClassName={({ date }) => addClassForWorkouts(date)}
      />

      {selectedDaysWorkouts !== undefined ? (
        selectedDaysWorkouts.map((workout) => (
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
      ) : (
        <h1>No workouts for this day</h1>
      )}

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

      {/* <div>
        {selectedDaysWorkouts !== undefined
          ? selectedDaysWorkouts.map((workout) => (
              <div key={workout._id}>
                <h3>{workout._id}</h3>
                <h2>{workout.name}</h2>
                <p>{workout.reps}</p>
                <p>{workout.weight}</p>
                <p>{workout.date}</p>
              </div>
            ))
          : null}
      </div> */}
    </div>
  );
});
