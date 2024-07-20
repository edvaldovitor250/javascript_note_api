var express = require('express');
var router = express.Router();

const User = require('../models/user')

require('dotenv').config();

router.post('/register',async (req,res) =>{
  const { name, email, password} = req.body;
  const user = new User({name, email, password})

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
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      let user = await User.findOne({ email });

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
