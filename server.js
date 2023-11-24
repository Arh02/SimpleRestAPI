const express = require('express')
const mongoose = require("mongoose")
const Product = require("./models/productmodel")
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
  res.send('this is my blog YO')
})

// for posting/creating data in the db 
app.post("/product", async(req,res) =>{
  try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//fetching all data from DB
app.get("/product/all", async(req,res) =>{
  try {
      const product = await Product.find({});
      res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//fetching based on id 
app.get("/product/:id", async(req,res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

// to update a product
app.put("/product/:id", async(req,res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id,req.body);
      if(!product){
        return res.status(404).json({message: 'cannot find any product with ID ${id}'})
      }
      const UpdatedProduct = await Product.findById(id);
      res.status(200).json(UpdatedProduct);
  } catch (error) {
    
    res.status(500).json({message: error.message})
  }
})

//to delete a product
app.delete("/product/:id", async(req,res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id);
      if(!product){
        return res.status(404).json({message: 'cannot find any product with ID ${id}'})
      }
      res.status(200).json(product);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})



mongoose.connect("mongodb+srv://dbUser:9PMwZD7QA8F96uno@cluster0.nltndzu.mongodb.net/Node-API")
.then(()=>{
  app.listen(
    port, () => {
    console.log(`Node API running on port ${port}`)
  })
  console.log("connected to MongoDB")
}).catch((error)=>{
  console.log(error)
})