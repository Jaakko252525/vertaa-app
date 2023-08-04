




export let sales = [
    {
      product: 'phone',
      price: '200'
    },
    {
      product: 'reppu',
      price: '20'
    },
  ]
  


export const typeDefs = `
  type Sale {
    product: String,
    price: String
  }

  type Query {
    allSales: [Sale!]!
  }

  type Mutation {
    addSale(product:String!, price: String!): Sale
  }

`
