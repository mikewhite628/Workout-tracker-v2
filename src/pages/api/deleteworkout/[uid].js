import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function deleteWorkout(req, res) {
  const { uid } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const workout = await db
      .collection("workouts")
      .deleteOne({ _id: ObjectId(uid) });
    res.send("workout deleted" + workout);
    console.log(uid);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
