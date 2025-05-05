const express = require('express')
const app = express()
const port = 3000
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const cors=require('cors')
app.use(cors())

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOP';
app.use(bodyparser.json())

client.connect();

//get all the passwords api
app.get('/', async(req, res) => {  
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.send(findResult)
})

//save a password api
app.post('/', async(req, res) => {  
    const password =req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.json({success:true,result:findResult})
})

//delet pasword api
app.delete('/', async(req, res) => {  
    const password =req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json({success:true,result:findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})