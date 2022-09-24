import { hashPassword } from "../../../src/lib/hashPass";
import connectToDatabase from "../../../src/lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password 
  ) {
    res.status(422).json({ message: "invalid input" });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({email:email})

  if (existingUser) {
    res.status(422).json({message: 'User already exists!'});
    client.close();
    return
  }

  const hashedPassword = await hashPassword(password);
  const bookmarks = []

  const result = await db
    .collection("users")
    .insertOne({ email: email, password: hashedPassword, bookmarks: bookmarks });

  res.status(201).json({ message: "user created" });
  client.close();
}

export default handler;
