var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/auth')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

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

router.put('/password', withAuth, async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

router.put('/:userId', withAuth, async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/', withAuth, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const result = await User.deleteOne({ _id: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
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

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_TOKEN, { expiresIn: '1h' });

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

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_TOKEN, { expiresIn: '1h' });

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