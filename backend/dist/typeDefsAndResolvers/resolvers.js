"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// .env file
require('dotenv').config();
// importing functionsForResolvers
const functionsForResolvers_1 = require("./functionsForResolvers");
// importing scrapers
const ToriScraper_3_1 = require("../scrapers/ToriScraper_3");
const HuutoNetScraper_1 = require("../scrapers/HuutoNetScraper");
const HuutokaupatcomScraper_1 = require("../scrapers/HuutokaupatcomScraper");
// authUser that verifys jwt token
const authMiddleware_1 = require("./authMiddleware");
// jwt import
const jwt = require('jsonwebtoken');
// crypt password
const bcrypt = require('bcrypt');
// importing model
const ForSale_1 = require("../models/ForSale");
// importing User Model
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
// Users DB connection
async function getAllUsersFromDB() {
    try {
        await mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database');
        let data = '';
        // getting data from db
        // @ts-ignore
        await User_1.User.find().then(result => {
            data = result;
        });
        if (!data) {
            console.log('find dont work', data);
        }
        return data;
    }
    catch (error) {
        console.log('error connecting to database!');
        console.log();
        console.log(error);
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
async function main() {
    try {
        await mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database');
        let data = '';
        // getting data from db
        // @ts-ignore
        await ForSale_1.ForSale.find().then(result => {
            data = result;
        });
        if (!data) {
            console.log('find dont work', data);
        }
        return data;
    }
    catch (error) {
        console.log('error connecting to database!');
        console.log();
        console.log(error);
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
exports.resolvers = {
    Query: {
        allSales: async () => {
            // connecting to mongoDB
            const data = await (0, functionsForResolvers_1.getForSale)();
            console.log('daata', data);
            return data;
        },
        // @ts-ignore
        userSales: async (obj, args, context, info) => {
            const { id } = args;
            // using function that returns users sales
            const sales = await (0, functionsForResolvers_1.getUserSales)(id);
            return sales;
        }
    },
    Mutation: {
        addSale: async (_root, args, _context) => {
            const { product, price, userId } = args;
            // making object
            const forSaleObject = {
                product,
                price,
                userId
            };
            // using function
            await (0, functionsForResolvers_1.newSale)(forSaleObject);
            return;
        },
        createNewUser: async (root, args, _context) => {
            console.log('inside create user');
            const { username, password } = args;
            //connecting to db
            await mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            let data = [];
            // finding usern in DB
            // @ts-ignore
            await User_1.User.find({ username: username }).then(result => {
                data = result;
                console.log('data', data, 'and typeof data:', typeof data);
            });
            // if username not used. Make user in db
            if (data.length === 0) {
                // making new user
                const newUser = await new User_1.User({
                    username: username,
                    password: password,
                    forSale: []
                });
                // saving user
                await newUser.save();
                // Save the updated newUser object to the database
                await newUser.save();
                // returning JWT token
                return newUser;
            }
            else
                return {
                    username: "already in",
                    password: "database"
                };
        },
        login: async (_root, args, _context) => {
            const { username, password } = args;
            // connecting to db
            await mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            // finding user
            const user = await User_1.User.findOne({ username });
            // check if password correct
            try {
                // checking if password correct
                if (user.password === password) {
                    // user for token
                    const userForToken = {
                        username: user.username
                    };
                    // creating jwt token. username is payload and TOKEN_SECRET is secret 
                    const token = await jwt.sign(username, process.env.TOKEN_SECRET);
                    // save user token
                    user.token = token;
                    return {
                        username: username,
                        password: token,
                        id: user.id
                    };
                }
            }
            catch (error) {
                // Handle any errors that occur during the process
                console.error('Error during login:', error);
                throw new Error('An error occurred during login.');
            }
        },
        // @ts-ignore
        deleteUser: async (_, { args }, { user }) => {
            const { username, password } = args;
            if (!user) {
                return {
                    username: 'no user and token'
                };
            }
            const userObject = {
                username: username,
                password: password
            };
            console.log('userObjectt');
            // check jwt
            await (0, authMiddleware_1.authUser)(userObject, user);
            await (0, functionsForResolvers_1.deleteUserFunction)(username, password);
            return userObject;
        },
        modifySale: async (root, args, _context) => {
            // destructing variables
            const { id, product, price, userId, token } = args;
            // making sale object
            const sale = {
                id,
                product,
                price,
                userId
            };
            console.log('sale', sale);
            await (0, functionsForResolvers_1.updateSale)(sale);
            console.log('sale updated succesfully!');
            return sale;
        },
        toriSearch: async (root, args, _context) => {
            const { product } = args;
            // call browsing function that fetches products from tori
            const toriSales = await (0, ToriScraper_3_1.browsing)(product);
            return toriSales;
        },
        huutoNetSearch: async (root, args, _context) => {
            const { product } = args;
            // call browsing function that fetches products from huutonet
            const huutoNetSales = await (0, HuutoNetScraper_1.getHuutoNetSales)(product);
            console.log('huutoNet sales', huutoNetSales);
            return huutoNetSales;
        },
        SearchSale: async (root, args, _context) => {
            // product
            const { product } = args;
            const sales = await (0, functionsForResolvers_1.FindSales)(product);
            console.log('sii:', sales);
            return sales;
        },
        huutokaupatSearch: async (root, args, _context) => {
            const { product } = args;
            // call browsing function that fetches products from huutokaupatcom
            const sales = await (0, HuutokaupatcomScraper_1.callingScraper)(product);
            return sales;
        },
        createChatRoomRequest: async (root, args, _context) => {
            // making variables
            const { seller, buyer, saleId, status } = args;
            // using function to crate new Chatroom request
            const request = await (0, functionsForResolvers_1.newChatRoomRequestFunction)(seller, buyer, saleId, status);
            return args;
        },
        editChatRoomRequestStatus: async (root, args, _context) => {
            const { chatReqId, status, forSaleId } = args;
            try {
                const obj = {
                    chatReqId,
                    status,
                    forSaleId
                };
                // calling function that 
                const callingFunction = await (0, functionsForResolvers_1.changeChatRoomReqStatus)(obj);
                return callingFunction;
            }
            catch (err) {
                console.log(err);
            }
        },
        getChatRoomRequests: async (root, args, _context) => {
            const { forSaleId } = args;
            // getChatReqsForSale
            const chatRoomReqests = await (0, functionsForResolvers_1.getChatReqsForSale)(forSaleId);
            let c = 0;
            let arrayOfChatroomReqs = [];
            console.log('reqs', chatRoomReqests);
            while (c < chatRoomReqests.length) {
                await arrayOfChatroomReqs.push({
                    id: chatRoomReqests[c]._id,
                    buyerId: chatRoomReqests[c].buyer,
                    forSale: chatRoomReqests[c].forSale
                });
                c += 1;
            }
            //console.log('array of chatroom reqs id', arrayOfChatroomReqs)
            return arrayOfChatroomReqs;
        },
        getBuyersChatroomRequests: async (root, args, _context) => {
            // buyers id
            const { buyerId } = args;
            console.log('id here', buyerId);
            const obj = {
                buyerId
            };
            // 
            const reqs = await (0, functionsForResolvers_1.getBuyersChatReqs)(obj);
            return reqs;
        }
    }
};
