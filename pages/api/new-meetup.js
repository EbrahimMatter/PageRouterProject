//api/meetup
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://ebrahimmatter991_db_user:Qy8yKQ3IN9El4kXV@cluster0.b4apxn3.mongodb.net/?appName=Cluster0",
    );
    const db = client.db();

    const meetupCollections = db.collection("meetups");

    const result = await meetupCollections.insertOne(data);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}
