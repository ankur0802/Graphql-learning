import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id:ID!): User
    quotes: [QuotewithName]
    myquotes(by:ID!): [QuotewithName]
  }
  

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [QuotewithName]
}

type QuotewithName {
    name: String!
    by:IdName!
  }
  type IdName{
    _id: String!
    firstName: String!
  }
  
  type Token{
    token: String
  }

type Mutation {
    signupUser(userNew:UserInput!): User
    signinUser(usersignin:UsersigninInput!): Token
    createQuote(name:String): String
    deleteUser(_id:String): String
    deleteQuote(_id:String): String
    updateQuote(update:updateQuote): QuotewithName
}

input updateQuote{
  _id: String!
  name:String!
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