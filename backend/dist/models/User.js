"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose = require('mongoose');
// schema for user
exports.userSchema = new mongoose.Schema({
    username: String,
    password: String,
    forSale: [],
    token: { type: String }
});
// model for user
exports.User = mongoose.model('User', exports.userSchema);
