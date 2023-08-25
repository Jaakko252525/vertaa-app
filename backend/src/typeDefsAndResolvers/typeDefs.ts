






export const typeDefs = `
  type Sale {
    _id: String
    product: String,
    price: String,
    userId: String,
    chatRoomRequests: [ChatRoomRequest]


  }

  type SaleWithToken {
    _id: String
    product: String,
    price: String,
    userId: String,
    token: String!,
    chatRoomRequests: [ChatRoomRequest]
  }

  type User {
    id: String
    username: String,
    password: String,
    forSale: [Sale]
    token: String
  }

  type ToriSale {
    id: String
    product: String
    price: String
    date: String
    location: String
  }

  type ChatRoomRequest {
    id: String
    seller: String
    buyer: String
    forSale: Sale
    status: String
  }

  type chatRoomRequestId {
    id: String
    buyerId: String
    forSale: Sale
  }


  type Query {
    allSales: [Sale!]!
    userSales(id:String!): [Sale]
  }

  type Mutation {
    addSale(product:String!, price: String!, userId: String!): Sale
    createNewUser(username:String!, password: String!): User
    login(username: String!, password:String!): User
    deleteUser(username: String!, password: String!, token: String!): User
    modifySale(product: String!, price: String!, userId: String!, id: String!, token: String): SaleWithToken
    SearchSale(product: String!): [Sale]
    toriSearch(product: String!): [String]
    huutoNetSearch(product: String!): [String]
    huutokaupatSearch(product: String!): [String]

    createChatRoomRequest(seller: String!, buyer: String!,saleId: String!, status: String!): ChatRoomRequest

    editChatRoomRequestStatus(chatReqId: String!, status: String!, forSaleId: String!): ChatRoomRequest

    getChatRoomRequests(forSaleId: String!): [chatRoomRequestId]

    getBuyersChatroomRequests(buyerId: String!): [ChatRoomRequest]

  }


`
