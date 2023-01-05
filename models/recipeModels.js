const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    name:{
        type:String,
        required: 'This fild is required'
    },
    description:{
        type:String,
        required: 'This fild is required'
    },
    ingredients:{
        type:Array,
        required: 'This fild is required'
    },
    image:{
        type:String,
        required: 'This fild is required'
    }
});

module.exports = mongoose.model('Recipe',recipeSchema);