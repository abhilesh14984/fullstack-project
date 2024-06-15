require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Validate request body
    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).send({ error: 'Password must be at least 6 characters long' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).send({ error: 'Username already exists' });
    }
    // Handle other errors
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send({ error: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send({ error: 'Invalid username or password' });
  }

  // Create and send JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET); // Token expires in 1 hour
  res.send({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
