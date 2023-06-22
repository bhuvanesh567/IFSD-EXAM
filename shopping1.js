const prompt=require("prompt-sync")();

const mongoose = require('mongoose');

// Define the shop schema
const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number
});

// Define the Shop model
const Shop = mongoose.model('Shop', shopSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://bhuvaneshklnbsc22:budhu2345@cluster0.d1tfzrq.mongodb.net/?retryWrites=true&w=majority;', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    calculateTotalRent();
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Function to calculate the total rent of all shops
async function calculateTotalRent() {
  try {
    // Fetch all documents from the collection
    const shops = await Shop.find();
    
    // Calculate the total rent
    let totalRent = 0;
    for (const shop of shops) {
      totalRent += shop.rent;
    }
    
    // Log the total rent
    console.log('Total Rent:', totalRent);
    
    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}
/mongodb+srv://bhuvaneshklnbsc22:budhu2345@cluster0.d1tfzrq.mongodb.net/test?retryWrites=true&w=majority