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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyersChatReqs = exports.getChatReqsForSale = exports.changeChatRoomReqStatus = exports.getForSale = exports.newChatRoomRequestFunction = exports.FindSales = exports.deleteUserFunction = exports.newSale = exports.getUserSales = exports.updateSale = void 0;
// mongoose import
var mongoose_1 = require("mongoose");
// importing models
var User_js_1 = require("../models/User.js");
var ForSale_js_1 = require("../models/ForSale.js");
var ChatRoomRequest_js_1 = require("../models/ChatRoomRequest.js");
var updateSale = function (sale) { return __awaiter(void 0, void 0, void 0, function () {
    var product, price, id, userId, updatedSale, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = sale.product, price = sale.price, id = sale.id, userId = sale.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 2:
                //connecting to db
                _a.sent();
                console.log('connected to db');
                return [4 /*yield*/, ForSale_js_1.ForSale.findOneAndUpdate({ _id: id }, {
                        _id: id,
                        product: product,
                        price: price,
                        userId: userId
                    })];
            case 3:
                updatedSale = _a.sent();
                if (!(updatedSale != null)) return [3 /*break*/, 5];
                // saving updated sale
                return [4 /*yield*/, updatedSale.save()];
            case 4:
                // saving updated sale
                _a.sent();
                return [2 /*return*/, updatedSale];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateSale = updateSale;
// getUserSales
var getUserSales = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 1:
                //connecting to db
                _a.sent();
                return [4 /*yield*/, User_js_1.User.findOne({ _id: id })];
            case 2:
                user = _a.sent();
                if (user != null) {
                    console.log('users sales', user.forSale);
                    return [2 /*return*/, user.forSale];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log('error is:', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserSales = getUserSales;
// new sale then update user, then update sale
var newSale = function (sale) { return __awaiter(void 0, void 0, void 0, function () {
    var product, price, userId, newSale_1, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = sale.product, price = sale.price, userId = sale.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 2:
                //connecting to db
                _a.sent();
                console.log('connected to db');
                return [4 /*yield*/, new ForSale_js_1.ForSale({
                        product: product,
                        price: price,
                        userId: userId
                    })
                    // save new sale
                ];
            case 3:
                newSale_1 = _a.sent();
                // save new sale
                return [4 /*yield*/, newSale_1.save()];
            case 4:
                // save new sale
                _a.sent();
                console.log('new sale made succesfully');
                return [4 /*yield*/, User_js_1.User.findOneAndUpdate({ _id: userId }, { $addToSet: { forSale: newSale_1 } }, { new: true })];
            case 5:
                user = _a.sent();
                if (!(user != null)) return [3 /*break*/, 7];
                return [4 /*yield*/, user.save()];
            case 6:
                _a.sent();
                return [2 /*return*/, user];
            case 7:
                console.log('user updated succesfully');
                return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.newSale = newSale;
// delete user and return its id
var deleteUserFunction = function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userObject, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 1:
                //connecting to db
                _a.sent();
                return [4 /*yield*/, User_js_1.User.findOne({ username: username })];
            case 2:
                user = _a.sent();
                if (user != null) {
                    userObject = {
                        username: user.username,
                        password: user.password,
                    };
                }
                console.log('here');
                if (!(user != null)) return [3 /*break*/, 6];
                if (!(password !== user.password)) return [3 /*break*/, 5];
                // find all sales with users id and delete
                return [4 /*yield*/, ForSale_js_1.ForSale.deleteMany({ userId: user.id })
                    // take id 
                ];
            case 3:
                // find all sales with users id and delete
                _a.sent();
                // take id 
                return [4 /*yield*/, user.deleteOne({ username: user.username })];
            case 4:
                // take id 
                _a.sent();
                console.log('succesfully deleted');
                return [2 /*return*/, user];
            case 5:
                console.log('password incorrect or something else..');
                return [2 /*return*/];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                console.log('error is:', error_4);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserFunction = deleteUserFunction;
// find sales
var FindSales = function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var sales, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 1:
                //connecting to db
                _a.sent();
                return [4 /*yield*/, ForSale_js_1.ForSale.find({ product: product })];
            case 2:
                sales = _a.sent();
                console.log(sales);
                return [2 /*return*/, sales];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.FindSales = FindSales;
// create ChatRoomRequest 
var newChatRoomRequestFunction = function (seller, buyer, saleId, status) { return __awaiter(void 0, void 0, void 0, function () {
    var sale, newChatRoomRequest, fundSaleAndUpdate, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 1:
                //connecting to db
                _a.sent();
                console.log('connected to mongo DB!');
                console.log('saleId:', saleId);
                return [4 /*yield*/, ForSale_js_1.ForSale.findById(saleId).exec()];
            case 2:
                sale = _a.sent();
                console.log('found the sale', sale);
                if (!(sale != null)) return [3 /*break*/, 9];
                return [4 /*yield*/, new ChatRoomRequest_js_1.ChatRoomRequest({
                        seller: seller,
                        buyer: buyer,
                        forSale: {
                            _id: saleId,
                            product: sale.product,
                            price: sale.price,
                            userId: sale.userId
                        },
                        status: status
                    })
                    // saving new chat req
                ];
            case 3:
                newChatRoomRequest = _a.sent();
                // saving new chat req
                return [4 /*yield*/, newChatRoomRequest.save()];
            case 4:
                // saving new chat req
                _a.sent();
                if (!(ForSale_js_1.ForSale != null && newChatRoomRequest != null)) return [3 /*break*/, 9];
                return [4 /*yield*/, ForSale_js_1.ForSale.findOneAndUpdate({ _id: saleId }, { $addToSet: { chatRoomRequests: newChatRoomRequest } }, { new: true })];
            case 5:
                fundSaleAndUpdate = _a.sent();
                if (!(fundSaleAndUpdate != null)) return [3 /*break*/, 7];
                return [4 /*yield*/, fundSaleAndUpdate.save()];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                console.log('new cahtroom req made!', newChatRoomRequest);
                // saving new data
                return [4 /*yield*/, newChatRoomRequest.save()];
            case 8:
                // saving new data
                _a.sent();
                console.log('new request made and saved to DB succesfully ☺');
                return [2 /*return*/, newChatRoomRequest];
            case 9: return [3 /*break*/, 11];
            case 10:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.newChatRoomRequestFunction = newChatRoomRequestFunction;
// getForSale DB connection
var getForSale = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 1:
                _a.sent();
                console.log('connected to database');
                // getting data from db
                return [4 /*yield*/, ForSale_js_1.ForSale.find().then(function (result) {
                        if (result != null) {
                            console.log('data in function:', result);
                            var data = result;
                            return result;
                        }
                    })];
            case 2:
                // getting data from db
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.log('error connecting to database!');
                console.log();
                console.log(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getForSale = getForSale;
// chatRoomRequest function
var changeChatRoomReqStatus = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var chatReqId, status, forSaleId, chatRoomreqFindUpdated, chatRoomreqFindUpdated, siuu, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatReqId = args.chatReqId, status = args.status, forSaleId = args.forSaleId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                if (!(status === 'accepted')) return [3 /*break*/, 4];
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 2:
                //connecting to db
                _a.sent();
                console.log('connected');
                return [4 /*yield*/, ChatRoomRequest_js_1.ChatRoomRequest.findByIdAndUpdate(chatReqId, { status: 'accepted' })
                    // finding forSale id from the chatroomRe inside the 
                ];
            case 3:
                chatRoomreqFindUpdated = _a.sent();
                // finding forSale id from the chatroomRe inside the 
                return [2 /*return*/, chatRoomreqFindUpdated];
            case 4:
                if (!(status === 'rejected')) return [3 /*break*/, 7];
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 5:
                //connecting to db
                _a.sent();
                return [4 /*yield*/, ChatRoomRequest_js_1.ChatRoomRequest.findByIdAndDelete({ _id: chatReqId })
                    // finding forSale with id then finding chatRoomReq with id then deleting it
                ];
            case 6:
                chatRoomreqFindUpdated = _a.sent();
                siuu = ForSale_js_1.ForSale.find({ "chatRoomRequests._id": chatReqId });
                console.log('what is this', siuu);
                return [2 /*return*/, chatRoomreqFindUpdated];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.changeChatRoomReqStatus = changeChatRoomReqStatus;
// getting all chatReqs for specific sale
var getChatReqsForSale = function (saleId) { return __awaiter(void 0, void 0, void 0, function () {
    var sale, requests, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 1:
                //connecting to db
                _a.sent();
                console.log('connected');
                return [4 /*yield*/, ForSale_js_1.ForSale.findOne({ _id: saleId })
                    // returning forSale chatRequests
                ];
            case 2:
                sale = _a.sent();
                if (!(sale != null)) return [3 /*break*/, 4];
                return [4 /*yield*/, sale.chatRoomRequests];
            case 3:
                requests = _a.sent();
                return [2 /*return*/, requests];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getChatReqsForSale = getChatReqsForSale;
// get buyers chatROomReqs
var getBuyersChatReqs = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var buyerId, reqs, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                buyerId = args.buyerId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                //connecting to db
                return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
            case 2:
                //connecting to db
                _a.sent();
                console.log('connected');
                console.log('id: ', buyerId);
                return [4 /*yield*/, ChatRoomRequest_js_1.ChatRoomRequest.find({ buyer: buyerId })];
            case 3:
                reqs = _a.sent();
                console.log('reqs are:', reqs);
                return [2 /*return*/, reqs];
            case 4:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getBuyersChatReqs = getBuyersChatReqs;
