const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })

const mongoURI = process.env.DATABASE;

// const mongoDB = async() => {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log('Connected!');
//         let fetched_data = mongoose.connection.db.collection("food_items");
//         let data = await fetched_data.find({}).toArray()

//         global.food_items = data;
//         console.log(global.food_items)

//     } catch (error) {
//         console.log('err: ', error);
//     }
// };

// module.exports = mongoDB;

const mongoDB = async() => {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");

    const fetch_data = mongoose.connection.db.collection("food_items").find({});
    const results = await fetch_data.toArray();

    if (results.length > 0) {
        const foodCategory = mongoose.connection.db.collection("foodCategory").find({});
        const result1 = await foodCategory.toArray();


        if (result1.length > 0) {
            result1.forEach((innerResult, j) => {
                global.foodCategory = result1;

            });
            console.log(results, result1)
        } else {
            console.log('No listing found');
        }
        global.food_items = results;
    } else {
        console.log('No listings found');
    }
};
module.exports = mongoDB;

// const mongoURI = 'mongodb+srv://gofood:792001gofood@cluster0.5pp4wdm.mongodb.net/gofoodmern?retryWrites=true&w=majority'