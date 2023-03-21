import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function adduser(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const sub = req.body.sub;

    const newUser = {
      name: name,
      email: email,
      sub: sub,
      workouts: [],
    };
    const client = await clientPromise;
    const db = client.db("test");
    //add new user to db
    const user = await db.collection("users").insertOne(newUser);
    res.send(user);
    console.log("user added");
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
