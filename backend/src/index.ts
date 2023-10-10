



const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')



// resolvers
//import { resolvers } from "./typeDefsAndResolvers/resolvers"
const { resolvers } = require('./typeDefsAndResolvers/resolvers')
// typeDefs
//import { typeDefs } from './typeDefsAndResolvers/typeDefs'

const { typeDefs } = require('./typeDefsAndResolvers/typeDefs')






const server = new ApolloServer({
  typeDefs,
  resolvers,
}

)

// production or development
const PORT = process.env.PORT || 4000


startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }: {url: string}) => {
  console.log(`Server ready at ${url}`)
})