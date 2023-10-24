"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForSale = exports.forSaleSchema = void 0;
var mongoose_1 = require("mongoose");
// forSaleSchema for user
exports.forSaleSchema = new mongoose_1.default.Schema({
    "product": String,
    "price": String,
    "userId": String,
    "chatRoomRequests": []
});
// model for user
exports.ForSale = mongoose_1.default.model('ForSale', exports.forSaleSchema);
