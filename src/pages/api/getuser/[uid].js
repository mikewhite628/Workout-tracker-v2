import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function getUser(req, res) {
  const { uid } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const user = await db.collection("users").find({ sid: uid }).toArray();
    console.log(req.body);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
