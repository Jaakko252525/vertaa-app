"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { ApolloServer } from 'apollo-server-express'
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const http = require("http");
const express = require('express');
// resolvers
const resolvers_1 = require("./typeDefsAndResolvers/resolvers");
// typeDefs
const typeDefs_1 = require("./typeDefsAndResolvers/typeDefs");
const server = new ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
//////
// production or development
const PORT = 4000;
startStandaloneServer(server, {
    listen: { port: PORT },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
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
