const  {MongoClient} = require('mongodb');
const plant = require('./plants.json')
// Replace the uri string with your MongoDB deployment's connection string.
require('dotenv').config()


const MONOGODB = process.env.MONGODBURL
const uri = MONOGODB;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();

    const database = client.db("myFirstDatabase");
    const foods = database.collection("plants");

    // create an array of documents to insert
   
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    const result = await foods.insertMany(plant, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
