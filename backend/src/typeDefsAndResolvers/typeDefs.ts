






export const typeDefs = `
  type Sale {
    _id: String
    product: String,
    price: String,
    userId: String,
  }

  type SaleWithToken {
    _id: String
    product: String,
    price: String,
    userId: String,
    token: String!
  }

  type User {
    id: String
    username: String,
    password: String,
    forSale: [Sale]
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
    ForSale: Sale
    status: String
  }



  type Query {
    allSales: [Sale!]!
    userSales(id:String!): [Sale]
  }

  type Mutation {
    addSale(product:String!, price: String!, userId: String!): Sale
    createNewUser(username:String!, password: String!): User
    login(username: String!, password:String!): User
    deleteUser(username: String!, password: String!): User
    modifySale(product: String!, price: String!, userId: String!, id: String!, token: String): SaleWithToken
    SearchSale(product: String!): [Sale]
    toriSearch(product: String!): [String]
    huutoNetSearch(product: String!): [String]
    huutokaupatSearch(product: String!): [String]

    createChatRoomRequest(seller: String!, buyer: String!,saleId: String!, status: String!): ChatRoomRequest

    acceptChatRoomRequest(chatReqId: String!, status: String!): ChatRoomRequest

  }


`
