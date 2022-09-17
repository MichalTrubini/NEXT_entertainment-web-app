import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
  );

  return client;
}
