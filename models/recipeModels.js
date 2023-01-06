const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe',recipeSchema);