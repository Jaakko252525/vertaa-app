



// mongoose import
import mongoose from 'mongoose';

// importing models
import { User } from "../models/User.js";
import { ForSale } from "../models/ForSale.js";
import { ChatRoomRequest } from "../models/ChatRoomRequest.js";


interface ForSaleInterface {
    product: string,
    price: string,
    userId: string
}

interface SaleInterfaceWithId {
    id: string
    product: string,
    price: string,
    userId: string
}



export const updateSale = async (sale: SaleInterfaceWithId) => {


    const { product, price, id, userId } = sale

    try {

        
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');

        console.log('connected to db')

        // find sale with id and update vales
        const updatedSale = await ForSale.findOneAndUpdate({_id: id}, 
            {
                _id: id,
                product: product,
                price: price,
                userId: userId
            }

            )
        
        if (updatedSale != null) {

            // saving updated sale
            await updatedSale.save()


            return updatedSale}



    

    } catch (error) {
        console.log(error)
    }

}



// getUserSales
export const getUserSales = async (id: string) => {


    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
    
        // finding user

        const user = await User.findOne({ _id: id })

        if (user != null)   {
            console.log('users sales', user.forSale)

            return user.forSale
            }

    } catch (error) {
        console.log('error is:', error)
    }

}


// new sale then update user, then update sale

export const newSale = async (sale: ForSaleInterface) => {

    // destructed variables
    const { product, price, userId } = sale


    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to db')

 

        // creating sale object
        const newSale = await new ForSale({ 
            product: product,
            price: price,
            userId: userId
         })

        // save new sale
        await newSale.save()

        console.log('new sale made succesfully')



        // finding user and updating its forSale value
        const user =  await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { forSale: newSale } },
            { new: true })
        
        
        
        if (user != null) {
        await user.save()
        return user
}
        console.log('user updated succesfully')

        


 

    } catch (error) {
        console.log(error)
    }


    
}




// delete user and return its id
export const deleteUserFunction = async (username: string, password: string) => {



    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
    
        // finding user and making variable
        const user = await User.findOne({ username: username })

        if (user != null) {
        const userObject = {
            username: user.username,
            password: user.password,

        }}
        console.log('here')


        // check if password correct
        if (user != null) {
        if (password !== user.password) {

            // find all sales with users id and delete
            await ForSale.deleteMany({ userId: user.id })



            // take id 
            await user.deleteOne({ username: user.username })

            console.log('succesfully deleted')

            return user

        } else {
            console.log('password incorrect or something else..')
            return
        } }
        

    } catch (error) {
        console.log('error is:', error)
    }


}


// find sales
export const FindSales = async (product: string) => {


    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
    
        // finding sales and making variable
        const sales = await ForSale.find({ product: product })

        console.log(sales)

        return sales




    } catch (error) {
        console.log(error)
    }
}



// create ChatRoomRequest 
export const newChatRoomRequestFunction = async (seller: string, buyer: string, saleId: string, status: string) => {


    try {
        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to mongo DB!')

        console.log('saleId:', saleId)
        
        // find ForSale with id
        const sale = await ForSale.findById(saleId).exec();


        console.log('found the sale', sale)

        if (sale != null){
            // creating new ChatRoomRequest
            const newChatRoomRequest = await new ChatRoomRequest({
                seller,
                buyer,
                forSale: {
                    _id: saleId,
                    product: sale.product,
                    price: sale.price,
                    userId: sale.userId

                },
                status
            })

            // saving new chat req
            await newChatRoomRequest.save()
    

    




        if (ForSale != null && newChatRoomRequest != null){
        // udating sale with the new chatRoomRequest
        const fundSaleAndUpdate = await ForSale.findOneAndUpdate(
            { _id: saleId },
            { $addToSet: { chatRoomRequests: newChatRoomRequest } },
            { new: true })

        if (fundSaleAndUpdate != null){
        await fundSaleAndUpdate.save()

}
 

        console.log('new cahtroom req made!', newChatRoomRequest)


        // saving new data
        await newChatRoomRequest.save()

        console.log('new request made and saved to DB succesfully ☺')

        return newChatRoomRequest
}}
        
       } catch (error) {
        console.log(error)
       }


}


// getForSale DB connection
export const getForSale = async () => {

    try {
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected to database')


        // getting data from db
        // @ts-ignore
        await ForSale.find().then(result => {
            const data = result
            return data
        }
        )



} catch(error) {
    console.log('error connecting to database!')
    console.log()
    console.log(error)
}
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


interface chatRoom {
    chatReqId: string,
    status: string,
    forSaleId: string
}

// chatRoomRequest function
export const changeChatRoomReqStatus = async (args: chatRoom) => {

    // variables
    const { chatReqId, status, forSaleId } = args


    try {


        // if accepted if 
        if ( status === 'accepted') {

            //connecting to db
            await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
            console.log('connected')
        
            // finding sales and making variable
            const chatRoomreqFindUpdated = await ChatRoomRequest.findByIdAndUpdate(chatReqId, {status: 'accepted'})


            // finding forSale id from the chatroomRe inside the 



            return chatRoomreqFindUpdated

        } else if ( status === 'rejected') {



             
            //connecting to db
            await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        
            // finding sales and making variable
            const chatRoomreqFindUpdated = await ChatRoomRequest.findByIdAndDelete({ _id: chatReqId })


            // finding forSale with id then finding chatRoomReq with id then deleting it

            const siuu = ForSale.find({"chatRoomRequests._id": chatReqId})

            console.log('what is this', siuu)

            

            return chatRoomreqFindUpdated

        }
        
        // not accepted

    } catch (err) {
        console.log(err)
    }



}



// getting all chatReqs for specific sale
export const getChatReqsForSale = async (saleId: string) => {



    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected')


        // finding forsale
        const sale = await ForSale.findOne({ _id: saleId })




        // returning forSale chatRequests
        if (sale != null){
            const requests = await sale.chatRoomRequests

            return requests
}

    } catch (err) {
        console.log(err)
    }



}


interface buyerInterface {
    buyerId: string
}

// get buyers chatROomReqs
export const getBuyersChatReqs = async (args: buyerInterface) => {

    const { buyerId } = args

    try {

        //connecting to db
        await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
        console.log('connected')

        console.log('id: ', buyerId)
        

        // finding chatroom reqs 
        const reqs = await ChatRoomRequest.find({ buyer: buyerId })

        console.log('reqs are:', reqs)

        return reqs




    } catch (err) {
        console.log(err)
    }
}




















