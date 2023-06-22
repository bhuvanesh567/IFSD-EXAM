const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://bhuvaneshklnbsc22:budhu3456@cluster0.d1tfzrq.mongodb.net/?retryWrites=true&w=majority"; // MongoDB connection URI
const dbName = 'your_database_name'; // Name of your MongoDB database
const collectionName = 'ShoppingComplex'; // Name of the collection

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to calculate the total rent of all shops
async function calculateTotalRent() {
  try {
    // Connect to MongoDB
    const { client, db } = await connectToMongoDB();
    
    // Fetch all documents from the collection
    const shops = await db.collection(collectionName).find().toArray();
    
    // Calculate the total rent
    let totalRent = 0;
    for (const shop of shops) {
      totalRent += shop.rent;
    }
    
    // Log the total rent
    console.log('Total Rent:', totalRent);
    
    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to calculate total rent
calculateTotalRent();
