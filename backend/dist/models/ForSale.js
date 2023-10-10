"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForSale = exports.forSaleSchema = void 0;
const mongoose = require('mongoose');
// forSaleSchema for user
exports.forSaleSchema = new mongoose.Schema({
    "product": String,
    "price": String,
    "userId": String,
    "chatRoomRequests": []
});
// model for user
exports.ForSale = mongoose.model('ForSale', exports.forSaleSchema);
