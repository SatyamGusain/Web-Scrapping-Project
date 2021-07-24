const express=require("express");
const https=require("https");
const app=express();
var h2p=require("html2plaintext");
var request=require("request");
let alert = require('alert');
const mongo=require("mongodb");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const fs = require('fs');
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://satyam:random123@cluster0.wiwow.mongodb.net/dusagefinal?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const gooose=new mongoose.Schema({
    websiteurl : String,
    datarel     : String
});

//------------     1st    ----------------------------------
var dat;
var x;
app.get("/",function(req,res){
  res.sendFile(__dirname + "/SignIn.html");
})
app.post("/",function(req,res){
  var key1=req.body.fName;
  var key2=req.body.pass;
  if(key1 == "Satyam" && key2 == "random123")
   {
   res.redirect('/yes');
   }
   else if(key1 == "Friend1" && key2 == "qwerty123")
    {
      res.redirect('/yes');
    }
    else if(key1 == "Friend2" && key2 == "asdfg123")
     {
      res.redirect('/yes');
    }
  else
  {
    res.redirect('/');
   }
})

//------------     2nd     ----------------------------------
app.get("/yes", function (req, res) {
  res.sendFile(__dirname + '/second.html')
})
app.post("/yes",function(req,res){
  x=req.body.urli;
  var text;
  request(
      {uri:x,
  }, function(error,response,body){
      text=body;
      dat = h2p(text);
      fs.writeFile('public/datanam.txt', dat, err => {
        if (err) {
          console.error(err)
          return
        }
      });
      const Contente=mongoose.model("URL",gooose );
        const contente= new Contente({
       websiteurl :x,
       datarel:dat
   }) ;
   contente.save();
     res.redirect('/yes1')
  });
})

//------------     3rd     ----------------------------------
app.get("/yes1", function (req, res) {
  res.sendFile(__dirname + '/third.html')
})

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port,function(){
  console.log("server working ngl");
})
