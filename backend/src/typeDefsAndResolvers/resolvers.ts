


// importing hardcoded data 
import { sales } from "./typeDefs"

// importing model
import { ForSale } from "../models/ForSale";

import mongoose from 'mongoose';

// getForSale

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



interface argssss {
    product: string,
    price: string
}

export const resolvers = {
  Query: {

    allSales: async () => {
        // connecting to mongoDB
        const data = await getForSale()
        console.log('daata', data)

        
        return sales
    }
  
},

  Mutation: {
    addSale: async (_root: string, args: argssss, _context: string) => {
        const { product, price } = args;
        // adding args to db
        sales.push({
            product,
            price
        })

        console.log('sales', sales)

        return {
            product,
            price
        }
    }
   }


}