const Recipe = require('../models/recipeModels');

const loadRecipe = async(req,res)=>{

try {
    /*
    const recipe = await Recipe.find({});
    res.render('recipes',{recipes:recipe});*/
    res.render('recipes');

} catch (error) {
    console.log(error.message);
}

}

module.exports = {
    loadRecipe
}