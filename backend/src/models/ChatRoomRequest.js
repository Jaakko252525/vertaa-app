"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomRequest = exports.chatRoomRequestSchema = void 0;
var mongoose_1 = require("mongoose");
// forSaleSchema for user
exports.chatRoomRequestSchema = new mongoose_1.default.Schema({
    "seller": String,
    "buyer": String,
    "forSale": Object,
    "status": String
});
// model for user
exports.ChatRoomRequest = mongoose_1.default.model('ChatRoomRequest', exports.chatRoomRequestSchema);
