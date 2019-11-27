const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  //check validate of the data from client
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  //find an existing user
  try {
    let user = await User.findOne({ email: req.body.email, userName: req.body.userName });
    if (user) {
      return res.status(400).json('User already registered.');
    }
    user = new User({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      age: req.body.age
    });
    //encrypt the password
    user.password = await bcrypt.hash(user.password, 10);
    //save in datbase the new user
    await user.save();

    const token = user.generateAuthToken();
    //send the user back to client and send token to authentication in the header request
    res.header('x-access-token', token).send({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      age: user.age
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
