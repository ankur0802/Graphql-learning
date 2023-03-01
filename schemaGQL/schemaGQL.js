import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id:ID!): User
    quotes: [Quote]
    myquotes(by:ID!): [Quote]
  }

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
}

  type Quote {
    name: String
    by: ID!
  }
  
  type Token{
    token: String
  }

type Mutation {
    signupUser(userNew:UserInput!): User
    signinUser(usersignin:UsersigninInput!): Token
    createQuote(name:String): String
}

input UserInput {
    firstName:String!
    lastName:String!
    email:String! 
    password:String!
}

input UsersigninInput {
    email:String! 
    password:String!
}

`;


export default typeDefs;