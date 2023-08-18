import { MongoClient } from 'mongodb';

async function handler (req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (!email || !email.includes('@') || name.trim() === '' || !message || message.trim() === '') {
            return res.status(422).json({ message: 'Invalid input!' });
        }
        const newMessage = { email, name, message };

        let client;

        try {
            client = await MongoClient.connect(process.env.mongo_uri);
        } catch (err) {
            return res.status(500).json({ message: 'Could not connect to database' });
        }

        const db = client.db();

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (err) {
            client.close();
            return res.status(500).json({ message: 'Storing message failed' });
        }
        client.close();

        res.status(201).json({ message: 'Successfully stored message' });
    }
}

export default handler;