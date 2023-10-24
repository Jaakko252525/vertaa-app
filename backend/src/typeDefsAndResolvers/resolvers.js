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
exports.resolvers = void 0;
// importing functionsForResolvers
var functionsForResolvers_js_1 = require("./functionsForResolvers.js");
// importing scrapers
var ToriScraper_3_js_1 = require("../scrapers/ToriScraper_3.js");
var HuutoNetScraper_js_1 = require("../scrapers/HuutoNetScraper.js");
var HuutokaupatcomScraper_js_1 = require("../scrapers/HuutokaupatcomScraper.js");
// authUser that verifys jwt token
var authMiddleware_js_1 = require("./authMiddleware.js");
// jwt import
var jsonwebtoken_1 = require("jsonwebtoken");
// crypt password
//const bcrypt = require('bcrypt')
// importing model
var ForSale_js_1 = require("../models/ForSale.js");
// importing User Model
var User_js_1 = require("../models/User.js");
var mongoose_1 = require("mongoose");
// Users DB connection
function getAllUsersFromDB() {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
                case 1:
                    _a.sent();
                    console.log('connected to database');
                    data = '';
                    // getting data from db
                    return [4 /*yield*/, User_js_1.User.find().then(function (result) {
                            var data = result;
                        })];
                case 2:
                    // getting data from db
                    _a.sent();
                    if (!data) {
                        console.log('find dont work', data);
                    }
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.log('error connecting to database!');
                    console.log();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
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
                                var data = result;
                                return data;
                            }
                            else {
                                return;
                            }
                        })];
                case 2:
                    // getting data from db
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log('error connecting to database!');
                    console.log();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.resolvers = {
    Query: {
        allSales: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, functionsForResolvers_js_1.getForSale)()];
                    case 1:
                        data = _a.sent();
                        if (data != null) {
                            console.log('daata', data);
                            return [2 /*return*/, data];
                        }
                        else {
                            console.log('data not in resolver');
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        userSales: function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var id, sales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('here in usersales');
                        id = args.id;
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.getUserSales)(id)];
                    case 1:
                        sales = _a.sent();
                        return [2 /*return*/, sales];
                }
            });
        }); }
    },
    Mutation: {
        addSale: function (_root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var product, price, userId, forSaleObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = args.product, price = args.price, userId = args.userId;
                        forSaleObject = {
                            product: product,
                            price: price,
                            userId: userId
                        };
                        // using function
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.newSale)(forSaleObject)];
                    case 1:
                        // using function
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        createNewUser: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, data, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('inside create user');
                        username = args.username, password = args.password;
                        //connecting to db
                        return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
                    case 1:
                        //connecting to db
                        _a.sent();
                        data = [];
                        // finding usern in DB
                        return [4 /*yield*/, User_js_1.User.find({ username: username }).then(function (result) {
                                data = result;
                                console.log('data', data, 'and typeof data:', typeof data);
                            })
                            // if username not used. Make user in db
                        ];
                    case 2:
                        // finding usern in DB
                        _a.sent();
                        if (!(data.length === 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, new User_js_1.User({
                                username: username,
                                password: password,
                                forSale: []
                            })
                            // saving user
                        ];
                    case 3:
                        newUser = _a.sent();
                        // saving user
                        return [4 /*yield*/, newUser.save()
                            // Save the updated newUser object to the database
                        ];
                    case 4:
                        // saving user
                        _a.sent();
                        // Save the updated newUser object to the database
                        return [4 /*yield*/, newUser.save()];
                    case 5:
                        // Save the updated newUser object to the database
                        _a.sent();
                        // returning JWT token
                        return [2 /*return*/, newUser];
                    case 6: return [2 /*return*/, {
                            username: "already in",
                            password: "database"
                        }];
                }
            });
        }); },
        login: function (_root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, user, userForToken, token, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = args.username, password = args.password;
                        // connecting to db
                        return [4 /*yield*/, mongoose_1.default.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/')];
                    case 1:
                        // connecting to db
                        _a.sent();
                        return [4 /*yield*/, User_js_1.User.findOne({ username: username })
                            // check if password correct
                        ];
                    case 2:
                        user = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        if (!(user != null)) return [3 /*break*/, 5];
                        if (!(user.password === password)) return [3 /*break*/, 5];
                        userForToken = {
                            username: user.username
                        };
                        return [4 /*yield*/, jsonwebtoken_1.default.sign(username, 'hello')
                            // save user token
                        ];
                    case 4:
                        token = _a.sent();
                        // save user token
                        user.token = token;
                        return [2 /*return*/, {
                                username: username,
                                password: token,
                                id: user.id
                            }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        // Handle any errors that occur during the process
                        console.error('Error during login:', error_3);
                        throw new Error('An error occurred during login.');
                    case 7: return [2 /*return*/];
                }
            });
        }); },
        deleteUser: function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, user, token, userObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = args.username, password = args.password, user = args.user, token = args.token;
                        if (!user) {
                            return [2 /*return*/, {
                                    username: 'no user and token'
                                }];
                        }
                        userObject = {
                            username: username,
                            password: password
                        };
                        console.log('userObjectt');
                        // check jwt
                        return [4 /*yield*/, (0, authMiddleware_js_1.authUser)(userObject, user)];
                    case 1:
                        // check jwt
                        _a.sent();
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.deleteUserFunction)(username, password)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, userObject];
                }
            });
        }); },
        modifySale: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var id, product, price, userId, token, sale;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args.id, product = args.product, price = args.price, userId = args.userId, token = args.token;
                        sale = {
                            id: id,
                            product: product,
                            price: price,
                            userId: userId
                        };
                        console.log('sale', sale);
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.updateSale)(sale)];
                    case 1:
                        _a.sent();
                        console.log('sale updated succesfully!');
                        return [2 /*return*/, sale];
                }
            });
        }); },
        toriSearch: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var product, toriSales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = args.product;
                        return [4 /*yield*/, (0, ToriScraper_3_js_1.browsing)(product)];
                    case 1:
                        toriSales = _a.sent();
                        return [2 /*return*/, toriSales];
                }
            });
        }); },
        huutoNetSearch: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var product, huutoNetSales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = args.product;
                        return [4 /*yield*/, (0, HuutoNetScraper_js_1.getHuutoNetSales)(product)];
                    case 1:
                        huutoNetSales = _a.sent();
                        console.log('huutoNet sales', huutoNetSales);
                        return [2 /*return*/, huutoNetSales];
                }
            });
        }); },
        SearchSale: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var product, sales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = args.product;
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.FindSales)(product)];
                    case 1:
                        sales = _a.sent();
                        console.log('sii:', sales);
                        return [2 /*return*/, sales];
                }
            });
        }); },
        huutokaupatSearch: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var product, sales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = args.product;
                        return [4 /*yield*/, (0, HuutokaupatcomScraper_js_1.callingScraper)(product)];
                    case 1:
                        sales = _a.sent();
                        return [2 /*return*/, sales];
                }
            });
        }); },
        createChatRoomRequest: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var seller, buyer, saleId, status, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seller = args.seller, buyer = args.buyer, saleId = args.saleId, status = args.status;
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.newChatRoomRequestFunction)(seller, buyer, saleId, status)];
                    case 1:
                        request = _a.sent();
                        return [2 /*return*/, args];
                }
            });
        }); },
        editChatRoomRequestStatus: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var chatReqId, status, forSaleId, obj, callingFunction, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatReqId = args.chatReqId, status = args.status, forSaleId = args.forSaleId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        obj = {
                            chatReqId: chatReqId,
                            status: status,
                            forSaleId: forSaleId
                        };
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.changeChatRoomReqStatus)(obj)];
                    case 2:
                        callingFunction = _a.sent();
                        return [2 /*return*/, callingFunction];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        getChatRoomRequests: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var forSaleId, chatRoomReqests, c, arrayOfChatroomReqs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        forSaleId = args.forSaleId;
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.getChatReqsForSale)(forSaleId)];
                    case 1:
                        chatRoomReqests = _a.sent();
                        if (!(chatRoomReqests != null)) return [3 /*break*/, 5];
                        c = 0;
                        arrayOfChatroomReqs = [];
                        console.log('reqs', chatRoomReqests);
                        _a.label = 2;
                    case 2:
                        if (!(c < chatRoomReqests.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, arrayOfChatroomReqs.push({
                                id: chatRoomReqests[c]._id,
                                buyerId: chatRoomReqests[c].buyer,
                                forSale: chatRoomReqests[c].forSale
                            })];
                    case 3:
                        _a.sent();
                        c += 1;
                        return [3 /*break*/, 2];
                    case 4: 
                    //console.log('array of chatroom reqs id', arrayOfChatroomReqs)
                    return [2 /*return*/, arrayOfChatroomReqs];
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        getBuyersChatroomRequests: function (root, args, _context) { return __awaiter(void 0, void 0, void 0, function () {
            var buyerId, obj, reqs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buyerId = args.buyerId;
                        console.log('id here', buyerId);
                        obj = {
                            buyerId: buyerId
                        };
                        return [4 /*yield*/, (0, functionsForResolvers_js_1.getBuyersChatReqs)(obj)];
                    case 1:
                        reqs = _a.sent();
                        return [2 /*return*/, reqs];
                }
            });
        }); }
    }
};
