
const Members = require('./Schema')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require("mongoose")
const app = express()
const apiPort = 3001

const {MongoClient, ServerApiVersion} = require('mongodb')

const uri = "mongodb+srv://roger:<pcc197>@cluster0.fy59q.mongodb.net/?retryWrites=true&w=majority";

//const mongodb_url = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"

const mongodb_url = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"


// var url = "mongodb://localhost:27017/";
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    
    res.send( mongodb_url )

    const client0 = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
 
    const client = new MongoClient (mongo_url )
    //console.log("Server version: " + ServerApiVersion.v1)
    console.log("async")
    
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log("await connect")
        // Send a ping to confirm a successful connection
        await client.db("crud").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        console.log( "closing" )
        await client.close();
      }
    }
    run().catch("error " );




  })

app.get('/api/get', (req,res)=>{

    res.send('<b>MongoDB localhost:3001</b>')


  })

// Mongodb node.js api
// http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertOne

// database: crud    collection: members
//https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/

// Create  (CRUD)
app.post('/api/create', (req,res)=>{

  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email
  const password = req.body.password
  const Schema = mongoose.Schema
  const membersSchema = new Schema(
    {
       fname: String,
       lname: String,
       email: String,
       password: String
    }

  )
  console.log("api/create")
  console.log("data: " + fname + " " + lname + " " + email + " " + password)
  async function run(){

//    const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"
//    const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/crud?retryWrites=true&w=majority"

    const client = new MongoClient( mongodb_url )
    try{
      const database = client.db("crud")
      const haiku = database.collection("members")
      const doc = {
                     fname: fname,
                     lname: lname,
                     email: email,
                     password: password

      }


      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("crud").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      const result = await haiku.insertOne( doc )
      console.log( result )
      console.log( result.insertedId )
    }finally{
        console.log("Inserted??? *** ")
        await client.close()

    }
  }


   run().catch( console.dir() )



  res.send("/api/create works" + req.body.fname)

})


// Read (CRUD)
app.get('/api/read', (req,res)=>{

  async function run( ){

     try{
      
      const client = new MongoClient( mongodb_url )
      const database = client.db("crud")
      const haiku = database.collection("members")

      const result = await haiku.find( { } )
    
      let r = []
      for await( const doc of result) {
          r.push( doc )
      }
      
      console.log("*****")
      console.log( r  )
      console.log("*****")

      res.json( r  )
     
     }finally{
          console.log("remember to close database connection ")
     }

  }

  run().catch( console.dir() )


})

// UPDATE (CRUD)
app.post('/api/update', (req,res) =>{
  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email
  const password = req.body.password
  const Schema = mongoose.Schema

  const membersSchema = new Schema(
    {
       fname: String,
       lname: String,
       email: String,
       password: String
    }

  )

  const filter = {email: email }
  //const options = {upsert: true }
  const options = {update: true }
  
  const updateDoc = {
     $set: {
        fname: fname,
        lname: lname,
        email: email,
        password: password

     }

  }
  
  async function run ( ){

    const client = new MongoClient( mongodb_url )
    try{
      const database = client.db("crud")
      const haiku = database.collection("members")

      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("crud").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const result = await haiku.updateOne(filter, updateDoc, options);
      
      console.log("*******")
      console.log( result )
      console.log( result.upsertedId )      
      console.log("*******")

    }finally{

      console.log("api/update")
      console.log("data: " + fname + " " + lname + " " + email + " " + password)
  
    }
 
  }


   run().catch( console.dir )

})

// DELETE (CRUD )
app.post('/api/delete', (req,res) =>{

  const email = req.body.email
  const options = {delete: true }

  const updateDoc = {
           email:{
            $eq: email
           }

  }
  
  const client = new MongoClient( mongodb_url )
  async function run(){
    const database = client.db("crud")
    const haiku = database.collection("members")
    const filter = {email: email }

    try{
      await client.connect();
      const result = await haiku.deleteOne(filter, updateDoc, options);

    }finally{
      console.log("*********** ")
      console.log("deleted: " + email )
      console.log("*********** ")
    }

  }

  run().catch( console.dir() )

})


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
