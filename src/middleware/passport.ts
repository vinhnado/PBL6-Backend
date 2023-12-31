import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { User } from "../models/User";
import Container from "typedi";
import { UserService } from "../services/UserService";
import { AuthenticationService } from "../services/AuthenticationService";
const GoogleStrategy = passportGoogle.Strategy;

require('dotenv').config();
const userService = Container.get(UserService);
const authenticationService = Container.get(AuthenticationService);

passport.use(
  new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback",
    passReqToCallback: true
    },
    async function (req,accessToken, refreshToken, profile, cb)  {
        try {
          
          console.log(accessToken, refreshToken)
            const profileJson = profile._json
            console.log(profileJson)
            if (profileJson.sub && profileJson.email) {
              const user = await userService.findOneUserByEmail(profileJson.email);
              if(user){
                req.payload = user
                return cb(null,user)
              }else{
                authenticationService.register(profileJson.email,new Date(),"None",profileJson.email,generateRandomString(16))
                const user = await userService.findOneUserByEmail(profileJson.email);
                
                req.payload = user
                return cb(null,user)
              }
            }
        } catch (error) {
            console.log(error)
        }
    }
  )
);

function generateRandomString(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
