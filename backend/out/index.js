// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
// resolvers
//import { resolvers } from "./typeDefsAndResolvers/resolvers"
// typeDefs
import { typeDefs } from './typeDefsAndResolvers/typeDefs.js';
import { resolvers } from "./typeDefsAndResolvers/resolvers.js";
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
});
await server.start();
app.use('/graphql', cors(), json(), expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log('server ready in localhost:4000/graphql');
