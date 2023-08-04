
const mongoose = require('mongoose');


// schema for user
export const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });


// model for user
export const User = mongoose.model('User', userSchema);







