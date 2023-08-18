const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')



// resolvers
import { resolvers } from "./typeDefsAndResolvers/resolvers"

// typeDefs
import { typeDefs } from './typeDefsAndResolvers/typeDefs'







const server = new ApolloServer({
  typeDefs,
  resolvers,
}

)

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }: {url: string}) => {
  console.log(`Server ready at ${url}`)
})