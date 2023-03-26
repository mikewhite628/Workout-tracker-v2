import clientPromise from "../../../../lib/mongodb";
import { ObjectID } from "mongodb";

export default async function getWorkouts(req, res) {
  const { uid } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const userData = await db
      .collection("users")
      .find({ _id: ObjectID(uid) })
      .toArray();

    res.json(userData.workouts);
  } catch (e) {
    console.error(e);
  }
}
