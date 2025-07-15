import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// ✅ Only define Contact here once
import Contact from './models/Contact.js'; // <-- this should exist and export the model

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://frajjaselin:MongoDBAtlas@cluster0.mzzr186.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error(err));

// ✅ Define your route
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📥 Incoming contact:', req.body);
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Message saved!' });
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
