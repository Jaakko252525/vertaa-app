


// importing functionsForResolvers
import { getUserSales, deleteUserFunction, newSale, updateSale } from './functionsForResolvers'
// importing tori scraper
import { browsing } from '../scrapers/ToriScraper_3'; 

// importing jwt generating function
import { generateAccessToken } from "../JWT/jwt";

// jwt import
const jwt = require('jsonwebtoken')

// crypt password
const bcrypt = require('bcrypt')


// importing model
import { ForSale } from "../models/ForSale";

// importing User Model
import { User } from "../models/User";

import mongoose from 'mongoose';
import { type } from 'os';

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
interface forSaleInterface {
    id: string
    product: string,
    price: string,
    userId: string
}

// user interface
interface interfaceForUser {
    username: string
    password: string
}

// userId interface
interface userIdInterface {
    id: string
}

// toriSale interface
interface toriSale {
    id: string
    product: string
    price: string
    date: string
    location: string
}

export const resolvers = {
  Query: {

    allSales: async () => {
        // connecting to mongoDB
        const data = await getForSale()
        console.log('daata', data)

        
        return data
    },
    // @ts-ignore
    userSales: async (obj, args: userIdInterface, context, info) => {


        const { id } = args

        // using function that returns users sales
        const sales = await getUserSales(id)
        console.log('saleeeeeeeee', sales)



        return sales

    }
    
  
},

  Mutation: {
    addSale: async (_root: string, args: forSaleInterface, _context: string) => {
        const { product, price, userId } = args;


        // making object
        const forSaleObject = {
            product,
            price,
            userId
        }


        // using function
        await newSale(forSaleObject)


        return
    },

    createNewUser: async (root: String, args: interfaceForUser, _context: string) => {
        console.log('inside create user')
        const { username, password } = args;

        // generating acces token
        const token = await generateAccessToken(password)

        // saving args to db
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        

        let data = []
        // finding usern in DB
        // @ts-ignore
        await User.find({ username: username }).then(result => {
            data = result
            console.log('data', data, 'and typeof data:', typeof data)
            
        })
        
        // if user not used. Make user in db
        if (data.length === 0) {

        
        
        // making new user
        const newUser =  await new User({
            username: username,
            password: password,
            forSale: []
            })
        // saving user
        await newUser.save()

        // returning JWT token
        return {
            username: username,
            password: token,
            forSale: []
        }
    } else return {
        username: "already in",
        password: "database"
    }

    },

    login: async (_root: string, args: interfaceForUser, _context: string) => {
        const { username, password } = args;


        // connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        // finding user
        const user = await User.findOne({ username })
        // check if password correct

        try {
        if (user.password === password) {
            // user for token
            const userForToken = {
                username: user.username
            }

            // token expires in 60*60 seconds, that is, in one hour
            const token = await jwt.sign(
                username,
                process.env.TOKEN_SECRET              
                )
                
            return {
                username: username,
                id: user.id,
                password: token
            } }
        else return 'wrong credentials'
        
        }

        catch (error) {
                // Handle any errors that occur during the process
                console.error('Error during login:', error);
                throw new Error('An error occurred during login.');
              }
            },
    
    deleteUser: async (root: string, args: interfaceForUser, _context: string) => {

        const { username, password } = args

        const userObject = {
            username: username,
            password: password
        }

        await deleteUserFunction(username, password)


        return userObject



    },
    modifySale: async (root: string, args: forSaleInterface, _context: string) => {

        
        // destructing variables
        const { id, product, price, userId } = args

        // making sale object
        const sale = {
            id,
            product,
            price,
            userId
        }

        console.log('sale', sale)



        await updateSale(sale)


        console.log('sale updated succesfully!')


        return sale




    },
    toriSearch: async (root: string, args: toriSale, _context: string) => {
        const { product } = args

        // call browsing function that fetches products from tori
        const toriSales = await browsing(product)

        console.log('toriSales', toriSales)



        

        return toriSales
    }


}
}


