import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function adduser(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const sid = req.body.sub;

    const newUser = {
      name: name,
      email: email,
      sid: sid,
      workouts: [],
    };
    const client = await clientPromise;
    const db = client.db("test");
    const user = await db.collection("users").save(newUser);
    res.send("new user added" + user);
  } catch (e) {
    console.error(e);
    res.send("error", e);
  }
}
