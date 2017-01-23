/******************************************
** Author: Nisarga Patel
** Description: In this file I will describe a general purpose
** user model that may be modified to fit the need of the specific
** project
********************************************/
let mongoose = require('mongoose');

// The validator package used for the isEmail function to validate email
let validator = require('validator');

/*******************************************
** This is the user schema used to create the user model,
** I used mongoose's great schema validation for checking
** I also wrote helpful error message on case of a validation error
** I chose to have a username field and an email field because
** I want to leave it up to the developer whether they want one
** or both.
*********************************************/
let userSchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, "Name is required"]
  },

  username: {
    type: String,
    minlength: 6,
    required: [true, "Username is required"]
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    validate: validator.isEmail,
    message: "{VALUE} is not a valid email"
  },

  bio: String,

  role: {
    type: String,
    default: 'normal'
  }

});

// Create the user model based on the schema recipe
let User = mongoose.model('User', userSchema);

// Export the user model for consumption
module.exports = User;
