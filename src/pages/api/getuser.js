import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function getUser(req, res) {
  try {
    const auth0ID = req.body.sid;
    const client = await clientPromise;
    const db = client.db("test");
    const user = await db.collection("users").find({ sid: auth0ID }).toArray();
    console.log(req.body);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
