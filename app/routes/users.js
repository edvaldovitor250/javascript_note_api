var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/auth')
const User = require('../models/user');

require('dotenv').config();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.put('/', withAuth, async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { name, email } },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.put('/password', withAuth, async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete('/', withAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.isCorrectPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.json({
      message: 'User logged in successfully',
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        created_at: user.created_at,
        updated_at: user.updated_at
      },
      token
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
