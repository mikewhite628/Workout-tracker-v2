import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function getUser(req, res) {
  const client = await clientPromise;
  const db = await client.db();

  const user = await db.collection("users").findOne({ email: email });

  res.status(200).json(user);
}
