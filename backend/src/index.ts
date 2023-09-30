


//import { ApolloServer } from 'apollo-server-express'
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const http = require("http")
const express = require('express')

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

// production or development
const PORT = process.env.PORT || 4000


startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }: {url: string}) => {
  console.log(`Server ready at ${url}`)
})

////// express

/*
// yt video ja mä

const startServer = async () => {


    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }: any) => ({ req, res })
    })



    const app = express()


    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: '*'
      }
    })

    app.listen({ port: 4000 }, () =>
    console.log(`server ready at localhost:4000${server.graphqlPath}`)
    );
};

startServer();

*/