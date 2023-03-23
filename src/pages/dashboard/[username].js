import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import Workout from "../../Components/Workout";
import PersonalRecords from "@/Components/PersonalRecords";
import TransparentLayer from "@/Components/TransparentLayer";

export default function Dashboard({ userDB }) {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [value, onChange] = useState(new Date());
  const [fetched, setFetched] = useState(false);
  const [updatingWorkout, setUpdatingWorkout] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState([]);
  const [selectedDaysWorkouts, setSelectedDaysWorkouts] = useState([{}]);
  const [selectedDate, setSelectedDate] = useState();
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [addingWorkout, setAddingWorkout] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // setUserWorkouts(userSession);
    if (userDB) {
      fetchData();
    }
  }, [fetched]);

  useEffect(() => {
    let userSession = sessionStorage.getItem("workouts");
    if (userSession === null) {
      fetchData();
      console.log("fetching data");
    } else {
      //if user session is not null, set user workouts to session data
      console.log("setting data from session");
      setUserWorkouts(JSON.parse(userSession));
    }
  }, [user]);

  const fetchData = async () => {
    const result = await axios
      .get(`/api/userinfo/${userDB[0]._id}`)
      .then((res) => {
        return res.data[0];
      });
    setUserWorkouts(result.workouts);
    setFetched(true);
    sessionStorage.setItem("workouts", JSON.stringify(userWorkouts));
  };

  function clearData() {
    setName("");
    setReps("");
    setWeight("");
  }

  const addWorkout = async (e, date) => {
    e.preventDefault();

    if (name === "" || reps === "" || weight === "") {
      alert("Please fill out all fields");
      return;
    }
    axios
      .post("/api/addworkout", {
        name: name,
        reps: reps,
        weight: weight,
        user: userDB[0]._id,
        date: selectedDate.toString(),
      })
      .then((res) => {
        console.log(res.data);
        setFetched(false);
        clearData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete workout
  const deleteWorkout = async (id) => {
    axios
      .delete(`/api/deleteworkout/${id}`)
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
    if (name === "" || reps === "" || weight === "") {
      alert("Please fill out all fields");
      return;
    }
    axios
      .put(`/api/updateworkout/${id}`, {
        name: name,
        reps: reps,
        weight: weight,
        user: userDB[0]._id,
      })
      .then((res) => {
        console.log(res.data);
        setFetched(false);
        toggleUpdatingWorkout();
        clearData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //toggle update workout form
  const toggleUpdatingWorkout = (id) => {
    setUpdatingWorkout(!updatingWorkout);
    setItemToUpdate(id);
    console.log(itemToUpdate);
  };

  //select calendar date and view workouts on that date
  useEffect(() => {
    selectDate();
  }, [value, fetched]);

  //view workouts on that date
  const selectDate = (e) => {
    setSelectedDate(value);
    setSelectedDateString(value.toString().slice(0, 10));
    const trimmedDate = value.toString().slice(0, 10);
    const selectedDateWorkouts = userWorkouts.filter(
      (workout) => workout.date.slice(0, 10) === trimmedDate
    );
    setSelectedDaysWorkouts(selectedDateWorkouts);
    checkDayForWorkouts(selectedDateWorkouts);
    console.log(value);
    console.log(selectedDaysWorkouts);
  };

  const checkDayForWorkouts = (selectedDateWorkouts) => {
    // if (selectedDateWorkouts.length > 0) {
    //   setAddingWorkout(true);
    // } else {
    //   setAddingWorkout(false);
    // }
    setAddingWorkout(true);
  };

  //add class to calendar if that day / month has workouts
  const addClassForWorkouts = (date) => {
    if (userWorkouts) {
      const trimmedDate = date.toString().slice(0, 10);
      const selectedDateWorkouts = userWorkouts.filter(
        (workout) => workout.date.slice(0, 10) === trimmedDate
      );

      const selectedMonthWorkouts = userWorkouts.filter(
        (workout) => workout.date.slice(4, 7) === months[date.getMonth()]
      );

      if (selectedDateWorkouts.length > 0) {
        return "workout dayView";
      }

      if (selectedMonthWorkouts.length > 0) {
        return "hasWorkouts monthView";
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="relative">
      <TransparentLayer addingWorkout={addingWorkout} />

      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={() => selectDate()}
        //add class if selected date has workouts
        tileClassName={({ date }) => addClassForWorkouts(date)}
        className={``}
      />
      <div className="legend-container flex flex-row p-6">
        <div className="flex flex-row mr-2">
          <div className="legend-box completed mr-2"></div>
          <span> Workout Recorded </span>
        </div>
        <div className="flex flex-row mr-2">
          <div className="legend-box incomplete mr-2"></div>
          <span> No Workout Recorded </span>
        </div>
        <div className="flex flex-row mr-2">
          <div className="legend-box today mr-2"></div>
          <span> Today </span>
        </div>
      </div>

      <div className="mb-6">
        <div className={`flex justify-center flex-col`}>
          <div className="flex flex-col justify-center items-center mb-6">
            <p
              className={`${selectedDaysWorkouts.length === 0 ? null : "hide"}`}
            >{`No workouts for this day just quite yet! Lets change that :)`}</p>
            <p
              className={`${selectedDaysWorkouts.length > 0 ? null : "hide"}`}
            >{`Workouts for ${selectedDateString}`}</p>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn w-48 mx-auto"
            onClick={() => setAddingWorkout(true)}
          >
            {selectedDaysWorkouts.length === 0
              ? "Add Workout"
              : "View Workouts"}
          </button>
        </div>

        <Workout
          selectedDaysWorkouts={selectedDaysWorkouts}
          updatingWorkout={updatingWorkout}
          itemToUpdate={itemToUpdate}
          toggleUpdatingWorkout={toggleUpdatingWorkout}
          deleteWorkout={deleteWorkout}
          updateWorkout={updateWorkout}
          addWorkout={addWorkout}
          setName={setName}
          setReps={setReps}
          setWeight={setWeight}
          setAddingWorkout={setAddingWorkout}
          addingWorkout={addingWorkout}
          selectedDateString={selectedDateString}
          weight={weight}
          reps={reps}
          name={name}
        />
      </div>
      <div className="px-6 mb-6"></div>
      <PersonalRecords userWorkouts={userWorkouts} user={user} />
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sub }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    return {
      props: {
        userDB: fetchDBUser,
      },
    };
  },
});
