import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  
  if(req.method === 'POST') {

    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://frontendMentor:frontendMentor@cluster0.tfa6tfc.mongodb.net/entertainmentApp?retryWrites=true&w=majority");

    const db = client.db();
  
    const choicesLong = db.collection('choicesShort');

    const result = await choicesLong.insertOne(data);

    client.close();

    res.status(200).json({ message: 'Data inserted' });
  }
}
