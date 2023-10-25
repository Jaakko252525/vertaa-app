import mongoose from 'mongoose';
// forSaleSchema for user
export const chatRoomRequestSchema = new mongoose.Schema({
    "seller": String,
    "buyer": String,
    "forSale": Object,
    "status": String
});
// model for user
export const ChatRoomRequest = mongoose.model('ChatRoomRequest', chatRoomRequestSchema);
