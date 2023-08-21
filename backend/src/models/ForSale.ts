




















const mongoose = require('mongoose');


// forSaleSchema for user
export const forSaleSchema = new mongoose.Schema({
  "product": String,
  "price": String,
  "userId": String,
  "chatRoomRequests": []
  });


// model for user
export const ForSale = mongoose.model('ForSale', forSaleSchema);








