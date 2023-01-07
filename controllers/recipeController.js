const { now } = require('mongoose');
const Recipe = require('../models/recipeModels');

const newRecipe = async(req,res)=>{

try {
    
    res.render('newRecipePage');

} catch (error) {
    console.log(error.message);
}

}

module.exports = {
    newRecipe
}