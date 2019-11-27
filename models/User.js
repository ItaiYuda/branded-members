var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    require: true
  }
});

UserSchema.methods.generateAuthToken = function() {
  const user = {
    _id: this._id
  };
  //generate token with the _id of the user
  const token = jwt.sign(user, config.get('jwtSecret'), {
    expiresIn: 360000
  });
  return token;
};

const validateUser = (user) => {
  const schema = {
    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    age: Joi.number()
      .min(10)
      .max(99)
      .required()
  };

  return Joi.validate(user, schema);
};

const loginValidate = (user) => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
};

var user = mongoose.model('User', UserSchema);

exports.User = user;
exports.validateUser = validateUser;
exports.loginValidate = loginValidate;
