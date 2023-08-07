

// importing jwt generating function
import { generateAccessToken } from "../JWT/jwt";





// importing model
import { ForSale } from "../models/ForSale";

// importing User Model
import { User } from "../models/User";

import mongoose from 'mongoose';

// getForSale DB connection
async function getForSale() {

    try {
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database')

        let data = ''        

        // getting data from db
        // @ts-ignore
        await ForSale.find().then(result => {
            data = result
            
        })
        if (!data) {
            console.log('find dont work', data)
        }
        return data



} catch(error) {
    console.log('error connecting to database!')
    console.log()
    console.log(error)
}
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Users DB connection
async function getAllUsersFromDB() {

    try {
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database')

        let data = ''        

        // getting data from db
        // @ts-ignore
        await User.find().then(result => {
            data = result
            
        })
        if (!data) {
            console.log('find dont work', data)
        }
        return data



} catch(error) {
    console.log('error connecting to database!')
    console.log()
    console.log(error)
}
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



async function main() {

    try {
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database')

        let data = ''        

        // getting data from db
        // @ts-ignore
        await ForSale.find().then(result => {
            data = result
            
        })
        if (!data) {
            console.log('find dont work', data)
        }
        return data



} catch(error) {
    console.log('error connecting to database!')
    console.log()
    console.log(error)
}
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// sale interface
interface argssss {
    product: string,
    price: string
}

// user interface
interface interfaceForUser {
    username: string
    password: string
}

export const resolvers = {
  Query: {

    allSales: async () => {
        // connecting to mongoDB
        const data = await getForSale()
        console.log('daata', data)

        
        return data
    }
  
},

  Mutation: {
    addSale: async (_root: string, args: argssss, _context: string) => {
        const { product, price } = args;
        // adding args to db


        return {
            product,
            price
        }
    },

    createNewUser: async (root: String, args: interfaceForUser, _context: string) => {
        console.log('inside create user')
        const { username, password } = args;

        // generating acces token
        const token = await generateAccessToken(password)

        // saving args to db
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // making new user
        const newUser =  await new User({username: username, password: password})
        // saving user
        await newUser.save()

        // returning JWT token
        return {
            username: username,
            password: token
        }

    },

    login: async (root: String, args: interfaceForUser, _context: string) => {
        const { username, password } = args;




   }


}}