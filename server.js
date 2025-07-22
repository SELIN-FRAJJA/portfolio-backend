import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Only define Contact here once
import Contact from './models/Contact.js'; // <-- this should exist and export the model

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Backend is working ✅');
});

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
