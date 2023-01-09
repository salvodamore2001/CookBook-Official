const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    title:{
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
    recipe_image:{
        type:String,
        required:true
    },
    comments:{
        type:Object,
        default:{}
    }
});

module.exports = mongoose.model('Recipe',recipeSchema);