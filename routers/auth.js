const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, loginValidate } = require('../models/user');
const express = require('express');
const router = express.Router();

// before enter to get request moved to auth middleware to check if the user have authentication to execute the request
router.get('/', auth, async (req, res) => {
  try {
    //req.user hold _id of user, search for user with the same id
    const user = await User.findById(req.user).select('-password');

    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      age: user.age
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', async (req, res) => {
  //check validation of the data from the client
  const { error } = loginValidate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    //search for user with the same email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    //campre the two hash password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    //if the eamil and password exist generate token for the user
    const token = user.generateAuthToken();
    res.header('x-access-token', token).send({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      age: user.age
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
