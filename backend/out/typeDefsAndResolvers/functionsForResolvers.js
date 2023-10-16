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
exports.getBuyersChatReqs = exports.getChatReqsForSale = exports.changeChatRoomReqStatus = exports.getForSale = exports.newChatRoomRequestFunction = exports.FindSales = exports.deleteUserFunction = exports.newSale = exports.getUserSales = exports.updateSale = void 0;
// mongoose import
const mongoose = require('mongoose');
// importing models
const User_1 = require("../models/User");
const ForSale_1 = require("../models/ForSale");
const ChatRoomRequest_1 = require("../models/ChatRoomRequest");
const updateSale = (sale) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, price, id, userId } = sale;
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to db');
        // find sale with id and update vales
        const updatedSale = yield ForSale_1.ForSale.findOneAndUpdate({ _id: id }, {
            _id: id,
            product: product,
            price: price,
            userId: userId
        });
        // saving updated sale
        yield updatedSale.save();
        return exports.updateSale;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateSale = updateSale;
// getUserSales
const getUserSales = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding user
        const user = yield User_1.User.findOne({ _id: id });
        console.log('users sales', user.forSale);
        return user.forSale;
    }
    catch (error) {
        console.log('error is:', error);
    }
});
exports.getUserSales = getUserSales;
// new sale then update user, then update sale
const newSale = (sale) => __awaiter(void 0, void 0, void 0, function* () {
    // destructed variables
    const { product, price, userId } = sale;
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to db');
        // creating sale object
        const newSale = yield new ForSale_1.ForSale({
            product: product,
            price: price,
            userId: userId
        });
        // save new sale
        yield newSale.save();
        console.log('new sale made succesfully');
        // finding user and updating its forSale value
        const user = yield User_1.User.findOneAndUpdate({ _id: userId }, { $addToSet: { forSale: newSale } }, { new: true });
        yield user.save();
        console.log('user updated succesfully');
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.newSale = newSale;
// delete user and return its id
const deleteUserFunction = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding user and making variable
        const user = yield User_1.User.findOne({ username: username });
        const userObject = {
            username: user.username,
            password: user.password,
        };
        console.log('here');
        // check if password correct
        if (password !== user.password) {
            // find all sales with users id and delete
            yield ForSale_1.ForSale.deleteMany({ userId: user.id });
            // take id 
            yield user.deleteOne({ username: user.username });
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
});
exports.deleteUserFunction = deleteUserFunction;
// find sales
const FindSales = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding sales and making variable
        const sales = yield ForSale_1.ForSale.find({ product: product });
        console.log(sales);
        return sales;
    }
    catch (error) {
        console.log(error);
    }
});
exports.FindSales = FindSales;
// create ChatRoomRequest 
const newChatRoomRequestFunction = (seller, buyer, saleId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to mongo DB!');
        console.log('saleId:', saleId);
        // find ForSale with id
        const sale = yield ForSale_1.ForSale.findById(saleId).exec();
        console.log('found the sale', sale);
        // creating new ChatRoomRequest
        const newChatRoomRequest = yield new ChatRoomRequest_1.ChatRoomRequest({
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
        yield newChatRoomRequest.save();
        // udating sale with the new chatRoomRequest
        const fundSaleAndUpdate = yield ForSale_1.ForSale.findOneAndUpdate({ _id: saleId }, { $addToSet: { chatRoomRequests: newChatRoomRequest } }, { new: true });
        yield fundSaleAndUpdate.save();
        console.log('new cahtroom req made!', newChatRoomRequest);
        // saving new data
        yield newChatRoomRequest.save();
        console.log('new request made and saved to DB succesfully ☺');
        return newChatRoomRequest;
    }
    catch (error) {
        console.log(error);
    }
});
exports.newChatRoomRequestFunction = newChatRoomRequestFunction;
// getForSale DB connection
const getForSale = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database');
        let data = '';
        // getting data from db
        // @ts-ignore
        yield ForSale_1.ForSale.find().then(result => {
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
});
exports.getForSale = getForSale;
// chatRoomRequest function
const changeChatRoomReqStatus = (args) => __awaiter(void 0, void 0, void 0, function* () {
    // variables
    const { chatReqId, status, forSaleId } = args;
    try {
        // if accepted if 
        if (status === 'accepted') {
            //connecting to db
            yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            console.log('connected');
            // finding sales and making variable
            const chatRoomreqFindUpdated = yield ChatRoomRequest_1.ChatRoomRequest.findByIdAndUpdate(chatReqId, { status: 'accepted' });
            // finding forSale id from the chatroomRe inside the 
            return chatRoomreqFindUpdated;
        }
        else if (status === 'rejected') {
            //connecting to db
            yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            // finding sales and making variable
            const chatRoomreqFindUpdated = yield ChatRoomRequest_1.ChatRoomRequest.findByIdAndDelete({ _id: chatReqId });
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
});
exports.changeChatRoomReqStatus = changeChatRoomReqStatus;
// getting all chatReqs for specific sale
const getChatReqsForSale = (saleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected');
        // finding forsale
        const sale = yield ForSale_1.ForSale.findOne({ _id: saleId });
        // returning forSale chatRequests
        const requests = yield sale.chatRoomRequests;
        return requests;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getChatReqsForSale = getChatReqsForSale;
// get buyers chatROomReqs
const getBuyersChatReqs = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyerId } = args;
    try {
        //connecting to db
        yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected');
        console.log('id: ', buyerId);
        // finding chatroom reqs 
        const reqs = yield ChatRoomRequest_1.ChatRoomRequest.find({ buyer: buyerId });
        console.log('reqs are:', reqs);
        return reqs;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getBuyersChatReqs = getBuyersChatReqs;
