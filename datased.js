const  {MongoClient} = require('mongodb');
const plant = require('./plants.json')
// Replace the uri string with your MongoDB deployment's connection string.
require('dotenv').config()

const MONGOLOCAL = process.env.MONGOLOCAL
const MONOGODB = process.env.MONGODBURL
const uri = MONOGODB;
const client = new MongoClient(MONGOLOCAL);
async function run() {
  try {
    await client.connect();

    const database = client.db("plantiful");
    const plants = database.collection("plants");
    const uniqueData = [...plant.reduce((map, obj)=>map.set(obj.latinName, obj), new Map()).values()]
console.log(uniqueData)
    // create an array of documents to insert
   
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    const result = await plants.insertMany(uniqueData, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
