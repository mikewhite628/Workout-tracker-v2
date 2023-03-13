const { default: clientPromise } = require("../../../lib/mongodb");
const date = require("date-and-time");
const ObjectID = require("mongodb").ObjectID;

export default async function addworkout(req, res) {
  try {
    const { name, reps, weight, user, date } = req.body;

    const newWorkout = {
      name: name
        .trim()
        .toLowerCase(name.charAt(0).toUpperCase() + name.slice(1)),
      reps: reps.trim(),
      weight: weight.trim(),
      user: user,
      date: date,
    };

    //sanitze data

    const client = await clientPromise;
    const db = client.db("test");

    //find user in db and then add workouts to that user
    const updateUser = async () => {
      await db
        .collection("users")
        .updateOne(
          { _id: ObjectID(user) },
          { $push: { workouts: newWorkout } }
        );
    };
    updateUser();

    const workout = await db.collection("workouts").insertOne(newWorkout);
    res.send("new workout added" + workout);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
