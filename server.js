import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from './schemaGQL/schemaGQL.js'
import connectDB from "./database/connection.js";

// import models here
import './models/User.js'
import './models/Quote.js'

import resolvers from './resolver/resolvers.js'
import context from "./middleware/context.js";

// connecting database
connectDB();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
}); 

server.listen().then(({ url }) => {
  console.log(`server listening at ${url}`);
});
