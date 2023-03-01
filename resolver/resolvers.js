import { users, quotes } from "../database/dummyDB.js";
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const User = mongoose.model('User');
const Quote = mongoose.model('Quote');

const resolvers = {
    Query: {
      users: () => users,
      user:(parent, {_id} )=> users.find(user=> user._id == _id),
      quotes: ()=> quotes,
      myquotes:(_, {by}) => quotes.filter(quotes => quotes.by == by)
    },
    User: {
      quotes: (ur)=> quotes.filter(quotes=> quotes.by == ur._id) 
    },
    Mutation:{
        signupUser: async (_, {userNew})=>{
            const user = await User.findOne({email:userNew.email})
            if(user){
              throw new Error ('User already exist with that email');
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userNew.password, salt);

            const newUser = new User({
              ...userNew,
              password: hashedPassword
            })
           return await newUser.save();
        },


        signinUser: async (_, {usersignin})=>{
            const user = await User.findOne({email:usersignin.email})
            if(!user){
              throw new Error ('User does not exist with that email')
            }
            const doMatch = await bcrypt.compare(usersignin.password, user.password)
            if(!doMatch){
              throw new Error ('email or password is invalid')
            }

            const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)
            return {token}
        },

        createQuote: async (_, {name}, {userId})=>{
          if(!userId){
            throw new Error ('You must be logged in')
          }
          const newQuote = new Quote({
            name,
            by:userId
          })
          await newQuote.save()
          return "Quote saved successfully"

        }


    }

  };
  

  export default resolvers;