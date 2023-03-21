import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function getUser(req, res) {
  const { email } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("test");
    const user = await db.collection("users").find({ email: email }).toArray();
    console.log(req.body);

    res.send(200, user, email);
  } catch (e) {
    console.error(e);
    res.send("error");
  }
}
