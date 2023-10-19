const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('car server is working perfectly');
})

// user: carsYe
// pass: t4Xy6Ejj208L6tFB



// const uri = "mongodb+srv://<username>:<password>@cluster0.jwathvu.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://carsYe:t4Xy6Ejj208L6tFB@cluster0.jwathvu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // get all cars for display
    const carCollection = client.db("carsYe").collection("allCars");

    app.get('/brandProducts', async(req, res) => {
        const cursor = carCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // app.get('/brandProducts/:id', async(req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) }
    //     const result = await carCollection.findOne(query);
    //     console.log(result);
    //     res.send(result);
    // })

    // post cars
    // app.post('/brandProducts', async(req, res) => {
    //     const cars = req.body;
    //     const result = await carCollection.insertOne(cars);
    //     console.log(result);
    //     res.send(result);
    // })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.listen(port, () => {
    console.log(`server is working on port ${port}`);
})