import express from 'express'
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const secretJWTKey = process.env.JWT_SECRET;

export const jwtutils = ()=>{
    app.get("/login",(req,res)=>{
        const token =  jwt.sign({_id:"sasa"},secretJWTKey)
          res
          .cookie("token",token,{httpOnly:true,secure:true, sameSite:"none"})
          .json({
              message:"login success"
          })
      
      });
}





