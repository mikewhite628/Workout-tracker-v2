import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function savePlan(req, res) {
  const { uid } = req.query;
  const plan = req.body.plan;

  try {
    const client = await clientPromise;
    const db = client.db("test");

    const user = await db.collection("users").updateOne(
      {
        _id: ObjectId(uid),
      },
      {
        $set: {
          plan: plan,
        },
      }
    );

    res.send(user);
    console.log("plan saved");
  } catch (e) {
    console.log(e);
    res.send("error");
  }
}
