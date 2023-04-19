//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
//! mongoDB is database where data is stored as a collection per page
//! mongoDB = HUMONGOUS 
//! db.items.find() => to find see the items in the collection
//! db.collectionName.count() => count collection
//! db.dropDatabase() will delete the documents inside that collection
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true , });
mongoose.set('strictQuery', false );
//! I'm using mongoDB as a database, ODM || Object document Mapping library
//! mongoDB is a document database, it thinks in documents, imagine Pages with pages inside the page.

//! Using EJS to render data in different lines

//! MONGOOSE IS

//! Core Concepts
//* Schemas and Models => e.g.User, Product
//* Instances => const user = new User() || how do you want your data to be designed base on your goal
//* Queries => User find()
const conn = mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = new  Schema ({ //! This is your array
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todo list!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "Click this to delete"
});

const defaultItems = [item1, item2, item3];


console.log(Item.length);
console.log("You got this!!!");



app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
    
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.")
        }
      });
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item ({
    name : itemName
  });

  item.save();

  res.redirect("/");
  
});




app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Still running on port 3000");
});
