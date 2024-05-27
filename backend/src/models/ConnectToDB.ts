



















// importing User schema

import mongoose from 'mongoose';

main().catch(err => console.log(err));

async function main() {
  try {

      await mongoose.connect('mongodb+srv://MrRobots25:KFaQvEBfLrC76xNE@cluster.tt1mykg.mongodb.net/');
      console.log('connected to database')

          

// forSaleSchema for use
    const forSaleSchema = new mongoose.Schema({
      "product": String,
      "price": String
      });


    // model for user
    const ForSale = mongoose.model('ForSale', forSaleSchema);




    const data = await ForSale.find({})

      console.log('daata', data)


} catch(error) {
    console.log('error connecting to database!')
    console.log()
    console.log(error)
}
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()




