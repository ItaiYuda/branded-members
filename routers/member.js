const express = require('express');
const auth = require('../middleware/auth');
const { User } = require('../models/user');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    //get all sign-in users
    const users = await User.find()
      .select('-password')
      .sort({ age: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
