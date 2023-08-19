

// .env file
require('dotenv').config();

import { config } from "dotenv";
import { User} from "../models/User";
// jwt import
const jwt = require('jsonwebtoken')


// @ts-ignore
export const authUser = async (user, req) => {

    try {
        // Get the access token
        let access_token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
          const { access_token: token } = req.cookies;
          access_token = token;
        }
    
        if (!access_token) return false;

        console.log('this is authorization Bearer: ', access_token)
        
        try {
        // Validate the Access token
        const decoded = jwt.verify(access_token, process.env.TOKEN_SECRET )
        console.log('verifying completed')

        user = decoded;
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
    console.log(err)
}

}


