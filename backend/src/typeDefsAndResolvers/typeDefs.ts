






export const typeDefs = `
  type Sale {
    product: String,
    price: String
  }

  type User {
    username: String,
    password: String
  }


  type Query {
    allSales: [Sale!]!
  }

  type Mutation {
    addSale(product:String!, price: String!): Sale
    createNewUser(username:String!, password: String!): User
    login(username: String!, password:String!): User
  }


`
