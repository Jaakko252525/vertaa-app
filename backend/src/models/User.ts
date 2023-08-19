
const mongoose = require('mongoose');


// schema for user
export const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    forSale: [],
    token: { type: String }
  });


// model for user
export const User = mongoose.model('User', userSchema);







