



const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')


const express = require('express')
const app = express()

// resolvers
import { resolvers } from "./typeDefsAndResolvers/resolvers"

// typeDefs
import { typeDefs } from './typeDefsAndResolvers/typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
}

)

//////
/*
// production or development
const PORT = process.env.PORT || 4000


startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }: {url: string}) => {
  console.log(`Server ready at ${url}`)
})
*/

////// express


// accepting request from spesific url
const cors = require('cors');
app.use(cors({
  origin: '*'
}));


// showing frontend when deployed???

app.use(express.static('build'))




app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);




