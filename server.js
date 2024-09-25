const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/totalmatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Simple User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  gender: String,
  preferences: {
    relationshipType: String,  // E.g., "Casual", "Long-term", "Kink"
    sexuality: String,         // E.g., "Heterosexual", "Bisexual", etc.
    fetishes: [String],        // Array of fetishes if any
  },
  bio: String,
  pictures: [String],          // Array of image URLs
  location: String,
});

const User = mongoose.model('User', userSchema);

// Register user
app.post('/register', async (req, res) => {
  const { username, password, age, gender, preferences, bio, location } = req.body;
  const newUser = new User({ username, password, age, gender, preferences, bio, location });
  await newUser.save();
  res.send('User registered');
});

// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Fetch potential matches
app.get('/matches', async (req, res) => {
  const { userId, preferences } = req.body;
  const matches = await User.find({
    preferences: {
      relationshipType: preferences.relationshipType,
      sexuality: preferences.sexuality,
      fetishes: { $in: preferences.fetishes }
    },
  });
  res.json(matches);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
