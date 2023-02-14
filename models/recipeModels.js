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
    image:{
        type:String,
        default:''
    },
    comments:{
        type:Object,
        default:{}
    }
});

module.exports = mongoose.model('Recipe',recipeSchema);