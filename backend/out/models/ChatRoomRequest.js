"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomRequest = exports.chatRoomRequestSchema = void 0;
const mongoose = require('mongoose');
// forSaleSchema for user
exports.chatRoomRequestSchema = new mongoose.Schema({
    "seller": String,
    "buyer": String,
    "forSale": Object,
    "status": String
});
// model for user
exports.ChatRoomRequest = mongoose.model('ChatRoomRequest', exports.chatRoomRequestSchema);
