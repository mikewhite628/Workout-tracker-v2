import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function updateWorkout(req, res) {
  const { uid } = req.query;
  const name = req.body.name;
  const weight = req.body.weight;
  const reps = req.body.reps;

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const workout = await db.collection("workouts").updateOne(
      {
        _id: ObjectId(uid),
      },
      {
        $set: {
          name: name,
          weight: weight,
          reps: reps,
        },
      }
    );

    const userWorkouts = await db.collection("users").updateOne(
      {
        workouts: { $elemMatch: { _id: ObjectId(uid) } },
      },
      {
        $set: {
          "workouts.$.name": name,
          "workouts.$.weight": weight,
          "workouts.$.reps": reps,
        },
      }
    );
    res.send(userWorkouts + " " + workout);
    console.log(uid);
  } catch (e) {
    console.log(e);
    res.send("error");
  }
}
