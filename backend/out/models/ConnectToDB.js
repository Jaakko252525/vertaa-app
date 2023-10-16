"use strict";
// importing User schema
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            console.log('connected to database');
            // forSaleSchema for use
            const forSaleSchema = new mongoose.Schema({
                "product": String,
                "price": String
            });
            // model for user
            const ForSale = mongoose.model('ForSale', forSaleSchema);
            const data = yield ForSale.find({});
            console.log('daata', data);
        }
        catch (error) {
            console.log('error connecting to database!');
            console.log();
            console.log(error);
        }
        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    });
}
main();
