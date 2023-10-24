"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
// schema for user
exports.userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    forSale: [],
    token: { type: String }
});
// model for user
exports.User = mongoose_1.default.model('User', exports.userSchema);
