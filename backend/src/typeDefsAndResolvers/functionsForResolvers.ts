


// mongoose import
const mongoose = require('mongoose');

// importing user model
import { User } from "../models/User";
import { ForSale } from "../models/ForSale";


interface ForSaleInterface {
    product: string,
    price: string,
    userId: string
}


// 
export const updateUser = async (sale:ForSaleInterface ) => {

    
    const { product, price, userId } = sale


    try {
        
        //connecting to db
       await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
       let data = []
       const userInDb =  await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { forSale: product } },
        { new: true })



       // saving update
       userInDb.save()

       
       console.log('user updated succesfully!')

        return
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
      }

}




// add forSale to db
export const addForSaleToDB = async (sale: ForSaleInterface) => {



         
    // variables
    const { product, price, userId } = sale




    try {


        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
       
        const newSale = await new ForSale({
            product,
            price,
            userId
        })



        // saving new sale in db
        await newSale.save()

        console.log(' sale added succesfully!')
        return


    }catch (error) {
        console.log('error is:', error)
    }
}


// getUserSales
export const getUserSales = async (id: string) => {


    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
    
        // finding user

        const user = await User.findOne({ _id: id })

        console.log('user', user)

        return user.forSale
        

    } catch (error) {
        console.log('error is:', error)
    }

}


// delete user and return its id
export const deleteUserFunction = async (username: string, password: string) => {



    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
    
        // finding user and making variable
        const user = await User.findOne({ username: username })

        const userObject = {
            username: user.username,
            password: user.password,

        }
        console.log('here')


        // check if password correct
        if (password !== user.password) {

            // find all sales with users id and delete
            await ForSale.deleteMany({ userId: user.id })



            // take id 
            await user.deleteOne({ username: user.username })

            console.log('succesfully deleted')

            return userObject

        } else {
            console.log('password incorrect or something else..')
            return
        } 
        

    } catch (error) {
        console.log('error is:', error)
    }


}







