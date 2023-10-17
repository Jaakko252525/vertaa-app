// importing functionsForResolvers
import { getUserSales, deleteUserFunction, newSale, updateSale, FindSales, newChatRoomRequestFunction, getForSale, changeChatRoomReqStatus, getChatReqsForSale, getBuyersChatReqs } from './functionsForResolvers.js';
// importing scrapers
import { browsing } from '../scrapers/ToriScraper_3.js';
import { getHuutoNetSales } from '../scrapers/HuutoNetScraper.js';
import { callingScraper } from '../scrapers/HuutokaupatcomScraper.js';
// authUser that verifys jwt token
import { authUser } from './authMiddleware.js';
// jwt import
import jwt from 'jsonwebtoken';
// crypt password
//const bcrypt = require('bcrypt')
// importing model
import { ForSale } from "../models/ForSale.js";
// importing User Model
import { User } from "../models/User.js";
import mongoose from 'mongoose';
// Users DB connection
async function getAllUsersFromDB() {
    try {
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database');
        let data = '';
        // getting data from db
        await User.find().then(result => {
            const data = result;
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
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database');
        // getting data from db
        await ForSale.find().then(result => {
            if (result != null) {
                const data = result;
                return data;
            }
            else {
                return;
            }
        });
    }
    catch (error) {
        console.log('error connecting to database!');
        console.log();
        console.log(error);
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
export const resolvers = {
    Query: {
        allSales: async () => {
            // connecting to mongoDB
            const data = await getForSale();
            console.log('daata', data);
            return data;
        },
        userSales: async (args) => {
            const { id } = args;
            // using function that returns users sales
            const sales = await getUserSales(id);
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
            await newSale(forSaleObject);
            return;
        },
        createNewUser: async (root, args, _context) => {
            console.log('inside create user');
            const { username, password } = args;
            //connecting to db
            await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            let data = [];
            // finding usern in DB
            await User.find({ username: username }).then(result => {
                data = result;
                console.log('data', data, 'and typeof data:', typeof data);
            });
            // if username not used. Make user in db
            if (data.length === 0) {
                // making new user
                const newUser = await new User({
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
            await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            // finding user
            const user = await User.findOne({ username });
            // check if password correct
            try {
                if (user != null) {
                    // checking if password correct
                    if (user.password === password) {
                        // user for token
                        const userForToken = {
                            username: user.username
                        };
                        // creating jwt token. username is payload and TOKEN_SECRET is secret 
                        const token = await jwt.sign(username, 'hello');
                        // save user token
                        user.token = token;
                        return {
                            username: username,
                            password: token,
                            id: user.id
                        };
                    }
                }
            }
            catch (error) {
                // Handle any errors that occur during the process
                console.error('Error during login:', error);
                throw new Error('An error occurred during login.');
            }
        },
        deleteUser: async (args) => {
            const { username, password, user, token } = args;
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
            await authUser(userObject, user);
            await deleteUserFunction(username, password);
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
            await updateSale(sale);
            console.log('sale updated succesfully!');
            return sale;
        },
        toriSearch: async (root, args, _context) => {
            const { product } = args;
            // call browsing function that fetches products from tori
            const toriSales = await browsing(product);
            return toriSales;
        },
        huutoNetSearch: async (root, args, _context) => {
            const { product } = args;
            // call browsing function that fetches products from huutonet
            const huutoNetSales = await getHuutoNetSales(product);
            console.log('huutoNet sales', huutoNetSales);
            return huutoNetSales;
        },
        SearchSale: async (root, args, _context) => {
            // product
            const { product } = args;
            const sales = await FindSales(product);
            console.log('sii:', sales);
            return sales;
        },
        huutokaupatSearch: async (root, args, _context) => {
            const { product } = args;
            // call browsing function that fetches products from huutokaupatcom
            const sales = await callingScraper(product);
            return sales;
        },
        createChatRoomRequest: async (root, args, _context) => {
            // making variables
            const { seller, buyer, saleId, status } = args;
            // using function to crate new Chatroom request
            const request = await newChatRoomRequestFunction(seller, buyer, saleId, status);
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
                const callingFunction = await changeChatRoomReqStatus(obj);
                return callingFunction;
            }
            catch (err) {
                console.log(err);
            }
        },
        getChatRoomRequests: async (root, args, _context) => {
            const { forSaleId } = args;
            // getChatReqsForSale
            const chatRoomReqests = await getChatReqsForSale(forSaleId);
            if (chatRoomReqests != null) {
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
            }
        },
        getBuyersChatroomRequests: async (root, args, _context) => {
            // buyers id
            const { buyerId } = args;
            console.log('id here', buyerId);
            const obj = {
                buyerId
            };
            // 
            const reqs = await getBuyersChatReqs(obj);
            return reqs;
        }
    }
};
