const Recipe = require('../models/recipeModels');

const loadRecipe = async(req,res)=>{

    try {
        
        res.render('home');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    loadRecipe
}