
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
    

    const uri = "mongodb://localhost:27017"

    res.send( uri )

    const client0 = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
 
    const client = new MongoClient (uri )
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

app.get('api/read', (req,res)=> {
// https://www.infoworld.com/article/3619533/how-to-crud-with-nodejs-and-mongodb.html
  
  res.send("good")
  return

  const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"
//  const client = new MongoClient("mongodb://localhost:27017");
  const client = new MongoClient(uri)
  async function run () {
     try{
      await client.connect()
      console.log("connected")

/*
      const database = client('crud')
      const collection = database.collection("members")
      console.log("connected")
      const cursor = collection.find( { } , { } )
      
      let items = []
      await cursor.forEach( function(doc){
           items.push(doc)
           console.log( doc )
//           res.end( JSON.stringify(items))

})
*/
     }finally{
         console.log("closing")
         client.close()
         res.send("finished")


     }

  }
    res.send("success")
//    run().catch( console.dir )
})

app.get('/api/read1', (req,res)=>{
//https://dev.to/omacys/building-a-basic-crud-api-with-nodejs-mongodb-and-expressjs-a-beginners-tutorial-1mmh
const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"
  let membSchema = mongoose.Schema( {
      fname: String,
      lname: String,
      email: String,
      password: String

  })

  let Profile = mongoose.model('Members', membSchema)

  mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(
    console.log("MongoDB connected")


  )
  .catch(err => consolelog(err))
  .finally( (err) => {
          mongoose.disconnect()
          console.log("MongoDB closed")
  
   })

})

// Read (CRUD)
// take create and do a read instead
app.get('/api/read', (req,res)=>{


  async function run( ){

    const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"

     try{
      
      let member = [
      {
          fname: "Patti",
          lname: "Dobashi",
          email: "patty@gmail.com",
          password: "patty"

      }

      ]
      const client = new MongoClient( uri )
      const database = client.db("crud")
      const haiku = database.collection("members")

      const result = await haiku.find( { } )
    
      let r = []
      for await( const doc of result) {

          //console.log( doc )
          r.push( doc )
      }
      
      console.log("*****")
      console.log( r  )
      console.log("*****")

      res.json( r  )

      console.log("good ")
     }finally{

          console.log("remember to close database connection ")

     }



  }

  run().catch( console.dir() )


})

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
    const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"
//    const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/crud?retryWrites=true&w=majority"


    const client = new MongoClient( uri )
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

app.get('/api/mongo', (req,res)=>{
 
  const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"

// const url = mongodb_url
 res.send('<b>Hello World2!</b>')

  //const uri = "mongodb+srv://tennismutt:<Crud1740>@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"
  

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
          // Send a ping to confirm a successful connection
          await client.db("crud").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");

        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      run().catch(console.dir);

      

}) // app.get

app.get('/api/docs' , (req,res)=>{

  const uri = "mongodb+srv://tennismutt:Crud1740@cluster0.bzft3k9.mongodb.net/?retryWrites=true&w=majority"
  const client = new MongoClient( uri )
 
   console.log("async")
   async function run(){
       try{

         const database = client.db("crud")        
         const members = database.collection("members")

         const query= {fname: "Joy"}
   
   //      const count = await members.countDocuments( query )
   //      console.log("members: " + count)
 
         const m = await members.find( query )
         console.log( m )

       }finally{

           await client.close()
       }


   }

   run().catch( console.dir )


})
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
