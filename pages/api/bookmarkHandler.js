import connectToDatabase from "../../src/lib/db";

async function bookmarkHandler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { bookmarkID, userEmail } = data;

  const client = await connectToDatabase();

  const db = client.db();

  const existingBookmark = await db
    .collection("users")
    .findOne({ email: userEmail, bookmarks: bookmarkID });

  if (existingBookmark) {
    await db
      .collection("users")
      .updateOne(
        { email: userEmail },
        { $pull: { bookmarks: bookmarkID } }
      );
  } else {
    await db
      .collection("users")
      .updateOne(
        { email: userEmail },
        { $push: { bookmarks: bookmarkID } }
      );
  }

  res.status(201).json({ message: "data added" });

  client.close();
}

export default bookmarkHandler;
