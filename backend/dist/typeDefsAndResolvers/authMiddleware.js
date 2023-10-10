"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
// .env file
require('dotenv').config();
// jwt import
const jwt = require('jsonwebtoken');
// @ts-ignore
const authUser = async (user, req) => {
    try {
        // Get the access token
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        if (!access_token)
            return false;
        console.log('this is authorization Bearer: ', access_token);
        try {
            // Validate the Access token
            const decoded = jwt.verify(access_token, process.env.TOKEN_SECRET);
            console.log('verifying completed');
            user = decoded;
        }
        catch (err) {
            console.log(err);
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.authUser = authUser;
