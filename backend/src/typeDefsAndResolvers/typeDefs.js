"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = "\n  type Sale {\n    _id: String\n    product: String,\n    price: String,\n    userId: String,\n    chatRoomRequests: [ChatRoomRequest]\n\n\n  }\n\n  type SaleWithToken {\n    _id: String\n    product: String,\n    price: String,\n    userId: String,\n    token: String!,\n    chatRoomRequests: [ChatRoomRequest]\n  }\n\n  type User {\n    id: String\n    username: String,\n    password: String,\n    forSale: [Sale]\n    token: String\n  }\n\n  type ToriSale {\n    id: String\n    product: String\n    price: String\n    date: String\n    location: String\n  }\n\n  type ChatRoomRequest {\n    id: String\n    seller: String\n    buyer: String\n    forSale: Sale\n    status: String\n  }\n\n  type chatRoomRequestId {\n    id: String\n    buyerId: String\n    forSale: Sale\n  }\n\n\n  type Query {\n    allSales: [Sale]\n    userSales(id:String!): [Sale]\n  }\n\n  type Mutation {\n    addSale(product:String!, price: String!, userId: String!): Sale\n    createNewUser(username:String!, password: String!): User\n    login(username: String!, password:String!): User\n    deleteUser(username: String!, password: String!, token: String!): User\n    modifySale(product: String!, price: String!, userId: String!, id: String!, token: String): SaleWithToken\n    SearchSale(product: String!): [Sale]\n    toriSearch(product: String!): [String]\n    huutoNetSearch(product: String!): [String]\n    huutokaupatSearch(product: String!): [String]\n\n    createChatRoomRequest(seller: String!, buyer: String!,saleId: String!, status: String!): ChatRoomRequest\n\n    editChatRoomRequestStatus(chatReqId: String!, status: String!, forSaleId: String!): ChatRoomRequest\n\n    getChatRoomRequests(forSaleId: String!): [chatRoomRequestId]\n\n    getBuyersChatroomRequests(buyerId: String!): [ChatRoomRequest]\n\n  }\n\n\n";
