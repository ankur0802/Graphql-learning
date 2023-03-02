import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


const context = ({req})=>{
    const {authorization} = req.headers
    if(authorization){
      const {userId} = jwt.verify(authorization, process.env.SECRET_KEY)
      return {userId}
    }
  }

export default context;
  