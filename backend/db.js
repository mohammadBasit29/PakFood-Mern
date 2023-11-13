const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://Basit_GoFood:1234@cluster0.wx6l5wz.mongodb.net/PakFood_mern?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");

    const fetched_data = await mongoose.connection.db.collection("food_items");

    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    // Store the data in a global variable for later use in frontend
    global.food_items = data;
    global.foodCategory = catData;

    
  } catch (err) {
    console.error(err);
  }
};

module.exports =  connectToMongoDB;
