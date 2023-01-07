const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://salvo:Salvodamore2001@newcluster.uj0lev5.mongodb.net/CookBook");
const path = require("path");

const express = require("express");
const app = express();

//for user routes
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

const recipeRoute = require('./routes/recipeRoute');
app.use('/recipes', recipeRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log("Server is running");
})