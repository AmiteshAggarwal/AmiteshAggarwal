
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Contact = require('./models/contact');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Paste your real MongoDB URI below 👇
mongoose.connect('mongodb://amiteshaggarwal9948:amitesh9948@ac-gnsy0e9-shard-00-00.dgmercz.mongodb.net:27017,ac-gnsy0e9-shard-00-01.dgmercz.mongodb.net:27017,ac-gnsy0e9-shard-00-02.dgmercz.mongodb.net:27017/?replicaSet=atlas-mamdww-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=contact1')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).send('Message saved to database!');
  } catch (err) {
    res.status(500).send('Failed to save message.');
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Contact = require('./models/contact');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Paste your real MongoDB URI below 👇
mongoose.connect('mongodb://amiteshaggarwal9948:amitesh9948@ac-gnsy0e9-shard-00-00.dgmercz.mongodb.net:27017,ac-gnsy0e9-shard-00-01.dgmercz.mongodb.net:27017,ac-gnsy0e9-shard-00-02.dgmercz.mongodb.net:27017/?replicaSet=atlas-mamdww-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=contact1')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).send('Message saved to database!');
  } catch (err) {
    res.status(500).send('Failed to save message.');
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});

