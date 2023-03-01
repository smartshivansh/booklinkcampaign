const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const Waitlist = require("./models/waitlist")
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/myty')



app.use(express.json())

app.use((req, res, next) => {
  
  res.header("Access-Control-Allow-Origin", "http://myty.in");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get("/", (req, res)=>{
  
})


app.post("/waitlist", async (req, res)=>{
  try {
    
    console.log(req.body);
    
    const document = new Waitlist(req.body);
    const saved = await document.save()

    
    res.send(JSON.stringify({sucess: true, document: saved}));
  } catch (error) {
    console.log(error); 
  }
})



app.listen(8080)