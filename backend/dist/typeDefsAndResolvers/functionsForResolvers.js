"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyersChatReqs = exports.getChatReqsForSale = exports.changeChatRoomReqStatus = exports.getForSale = exports.newChatRoomRequestFunction = exports.FindSales = exports.deleteUserFunction = exports.newSale = exports.getUserSales = exports.updateSale = void 0;
// mongoose import
const mongoose = require('mongoose');
// importing models
const User_1 = require("../models/User");
const ForSale_1 = require("../models/ForSale");
const ChatRoomRequest_1 = require("../models/ChatRoomRequest");
const updateSale = async (sale) => {
    const { product, price, id, userId } = sale;
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to db');
        // find sale with id and update vales
        const updatedSale = await ForSale_1.ForSale.findOneAndUpdate({ _id: id }, {
            _id: id,
            product: product,
            price: price,
            userId: userId
        });
        // saving updated sale
        await updatedSale.save();
        return exports.updateSale;
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateSale = updateSale;
// getUserSales
const getUserSales = async (id) => {
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding user
        const user = await User_1.User.findOne({ _id: id });
        console.log('users sales', user.forSale);
        return user.forSale;
    }
    catch (error) {
        console.log('error is:', error);
    }
};
exports.getUserSales = getUserSales;
// new sale then update user, then update sale
const newSale = async (sale) => {
    // destructed variables
    const { product, price, userId } = sale;
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to db');
        // creating sale object
        const newSale = await new ForSale_1.ForSale({
            product: product,
            price: price,
            userId: userId
        });
        // save new sale
        await newSale.save();
        console.log('new sale made succesfully');
        // finding user and updating its forSale value
        const user = await User_1.User.findOneAndUpdate({ _id: userId }, { $addToSet: { forSale: newSale } }, { new: true });
        await user.save();
        console.log('user updated succesfully');
        return user;
    }
    catch (error) {
        console.log(error);
    }
};
exports.newSale = newSale;
// delete user and return its id
const deleteUserFunction = async (username, password) => {
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding user and making variable
        const user = await User_1.User.findOne({ username: username });
        const userObject = {
            username: user.username,
            password: user.password,
        };
        console.log('here');
        // check if password correct
        if (password !== user.password) {
            // find all sales with users id and delete
            await ForSale_1.ForSale.deleteMany({ userId: user.id });
            // take id 
            await user.deleteOne({ username: user.username });
            console.log('succesfully deleted');
            return userObject;
        }
        else {
            console.log('password incorrect or something else..');
            return;
        }
    }
    catch (error) {
        console.log('error is:', error);
    }
};
exports.deleteUserFunction = deleteUserFunction;
// find sales
const FindSales = async (product) => {
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding sales and making variable
        const sales = await ForSale_1.ForSale.find({ product: product });
        console.log(sales);
        return sales;
    }
    catch (error) {
        console.log(error);
    }
};
exports.FindSales = FindSales;
// create ChatRoomRequest 
const newChatRoomRequestFunction = async (seller, buyer, saleId, status) => {
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to mongo DB!');
        console.log('saleId:', saleId);
        // find ForSale with id
        const sale = await ForSale_1.ForSale.findById(saleId).exec();
        console.log('found the sale', sale);
        // creating new ChatRoomRequest
        const newChatRoomRequest = await new ChatRoomRequest_1.ChatRoomRequest({
            seller,
            buyer,
            forSale: {
                _id: saleId,
                product: sale.product,
                price: sale.price,
                userId: sale.userId
            },
            status
        });
        // saving new chat req
        await newChatRoomRequest.save();
        // udating sale with the new chatRoomRequest
        const fundSaleAndUpdate = await ForSale_1.ForSale.findOneAndUpdate({ _id: saleId }, { $addToSet: { chatRoomRequests: newChatRoomRequest } }, { new: true });
        await fundSaleAndUpdate.save();
        console.log('new cahtroom req made!', newChatRoomRequest);
        // saving new data
        await newChatRoomRequest.save();
        console.log('new request made and saved to DB succesfully ☺');
        return newChatRoomRequest;
    }
    catch (error) {
        console.log(error);
    }
};
exports.newChatRoomRequestFunction = newChatRoomRequestFunction;
// getForSale DB connection
const getForSale = async () => {
    try {
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
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
};
exports.getForSale = getForSale;
// chatRoomRequest function
const changeChatRoomReqStatus = async (args) => {
    // variables
    const { chatReqId, status, forSaleId } = args;
    try {
        // if accepted if 
        if (status === 'accepted') {
            //connecting to db
            await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            console.log('connected');
            // finding sales and making variable
            const chatRoomreqFindUpdated = await ChatRoomRequest_1.ChatRoomRequest.findByIdAndUpdate(chatReqId, { status: 'accepted' });
            // finding forSale id from the chatroomRe inside the 
            return chatRoomreqFindUpdated;
        }
        else if (status === 'rejected') {
            //connecting to db
            await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            // finding sales and making variable
            const chatRoomreqFindUpdated = await ChatRoomRequest_1.ChatRoomRequest.findByIdAndDelete({ _id: chatReqId });
            // finding forSale with id then finding chatRoomReq with id then deleting it
            const siuu = ForSale_1.ForSale.find({ "chatRoomRequests._id": chatReqId });
            console.log('what is this', siuu);
            return chatRoomreqFindUpdated;
        }
        // not accepted
    }
    catch (err) {
        console.log(err);
    }
};
exports.changeChatRoomReqStatus = changeChatRoomReqStatus;
// getting all chatReqs for specific sale
const getChatReqsForSale = async (saleId) => {
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected');
        // finding forsale
        const sale = await ForSale_1.ForSale.findOne({ _id: saleId });
        // returning forSale chatRequests
        const requests = await sale.chatRoomRequests;
        return requests;
    }
    catch (err) {
        console.log(err);
    }
};
exports.getChatReqsForSale = getChatReqsForSale;
// get buyers chatROomReqs
const getBuyersChatReqs = async (args) => {
    const { buyerId } = args;
    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected');
        console.log('id: ', buyerId);
        // finding chatroom reqs 
        const reqs = await ChatRoomRequest_1.ChatRoomRequest.find({ buyer: buyerId });
        console.log('reqs are:', reqs);
        return reqs;
    }
    catch (err) {
        console.log(err);
    }
};
exports.getBuyersChatReqs = getBuyersChatReqs;
