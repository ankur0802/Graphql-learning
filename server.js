import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, products } from "./dummyDB.js";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id:ID!): User
    products: [Product]
    myproducts(by:ID!): [Product]
  }

type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    products: [Product]
}

  type Product {
    name: String
    price: String
    by: ID!
  }

`;

const resolvers = {
  Query: {
    users: () => users,
    user:(parent, {id} )=> users.find(user=> user.id == id),
    products: ()=> products,
    myproducts:(_, {by}) => products.filter(products => products.by == by)
  },
  User: {
    products: (ur)=> products.filter(products=> products.by == ur.id) 
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
}); 

server.listen().then(({ url }) => {
  console.log(`server listening at ${url}`);
});
