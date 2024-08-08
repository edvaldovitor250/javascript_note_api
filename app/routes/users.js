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

router.put('/', withAuth, async function(req, res) {
  const { name, email } = req.body;

  try {
    var user = await User.findOneAndUpdate(
      {_id: req.user._id}, 
      { $set: { name: name, email: email}}, 
      { upsert: true, 'new': true }
    )
    res.json(user);
  } catch (error) {
    res.status(401).json({error: error});
  }
});

router.put('/password', withAuth, async function(req, res) {
  const { password } = req.body;

  try {
    var user = await User.findOne({_id: req.user._id})
    user.password = password
    user.save()
    res.json(user);
  } catch (error) {
    res.status(401).json({error: error});
  }
});

router.delete('/', withAuth, async function(req, res) {
  try {
    let user = await User.findOne({_id: req.user._id });
    await user.delete();
    res.json({message: 'OK'}).status(201);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

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
