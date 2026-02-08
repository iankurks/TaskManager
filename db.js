const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();
const uri = "mongodb+srv://iankurks:Best%401234@task-manager-cluster.gfhqbxf.mongodb.net/?appName=task-manager-cluster" //process.env.MONGO_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let database = null; // shared db variable
async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    database = await client.db("TaskManagerDB")
    // .command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return database;
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
connectDB().catch(console.dir);

module.exports = connectDB;
