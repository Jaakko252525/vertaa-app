"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
// .env file
require('dotenv').config();
// jwt import
const jwt = require('jsonwebtoken');
// @ts-ignore
const authUser = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.authUser = authUser;
