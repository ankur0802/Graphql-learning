import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from './schemaGQL/schemaGQL.js'
import connectDB from "./database/connection.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


// connecting database
connectDB();

// import models here
import './models/User.js'
import './models/Quote.js'

import resolvers from './resolver/resolvers.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req})=>{
    const {authorization} = req.headers
    if(authorization){
      const {userId} = jwt.verify(authorization, process.env.SECRET_KEY)
      return {userId}
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
}); 

server.listen().then(({ url }) => {
  console.log(`server listening at ${url}`);
});
