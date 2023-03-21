import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function getUser(req, res) {
  try {
    const auth0ID = req.body.sub;
    const client = await clientPromise;
    const db = client.db("test");
    const user = await db.collection("users").find({ sub: auth0ID }).toArray();
    console.log(req.body);
    res.json(auth0ID);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
