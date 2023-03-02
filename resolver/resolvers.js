
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const User = mongoose.model('User');
const Quote = mongoose.model('Quote');

const resolvers = {
    Query: {
      users: async () => await User.find({}),
      user: async (parent, {_id} )=> await User.findOne({_id}),
      quotes: async ()=> await Quote.find({}).populate('by', '_id firstName'),
      myquotes: async (_, {by}) => await Quote.find({by})
    },
    User: {
      quotes: async (ur)=> await Quote.find({by:ur._id}) 
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

        },

        deleteQuote: async (_, {_id}, {userId})=>{
          if(!userId) {
            throw new Error ('First you have to logged in')
          }
          await Quote.findByIdAndDelete({_id});
          return "Quote Deleted Successfully"
        },


        deleteUser: async (_,{_id}, {userId})=>{
          if(!userId) {
            throw new Error ('First you have to logged in')
          }
          await User.findByIdAndDelete({_id});

          return "User Deleted Successfully"
        },


        updateQuote: async (_, {update}, {userId})=>{
          if(!userId) {
            throw new Error ('First you have to logged in')
          }
          const updateQuote = await Quote.findByIdAndUpdate({_id:update._id}, {name:update.name}, {new:true})
          return await updateQuote;
        }


    }

  };
  

  export default resolvers;