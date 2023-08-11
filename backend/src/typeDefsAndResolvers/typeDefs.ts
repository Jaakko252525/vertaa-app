






export const typeDefs = `
  type Sale {
    _id: String
    product: String,
    price: String,
    userId: String,
  }

  type User {
    id: String
    username: String,
    password: String,
    forSale: [Sale]
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
    modifySale(product: String!, price: String!, userId: String!, id: String!): Sale
  }


`
