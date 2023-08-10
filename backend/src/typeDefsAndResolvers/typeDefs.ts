






export const typeDefs = `
  type Sale {
    product: String,
    price: String,
    user: String,
  }

  type User {
    id: String
    username: String,
    password: String,
    forSale: [Sale]
  }

  type salesObject {
    forSale: [String]
  }

  type Query {
    allSales: [Sale!]!
    userSales(id:String!): [String]
  }

  type Mutation {
    addSale(product:String!, price: String!, userId: String!): Sale
    createNewUser(username:String!, password: String!): User
    login(username: String!, password:String!): User
  }


`
