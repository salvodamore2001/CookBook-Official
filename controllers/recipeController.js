const { now } = require('mongoose');
const Recipe = require('../models/recipeModels');

const loadRecipe = async(req,res)=>{

    try {
        
        const recipes = [{
            title: 'Recipe Test Title',
            createdAt: new Date(),
            description: 'Recipe Test Description'
        },
    {
        title: 'Recipe Test2 Title',
        createdAt: new Date(),
        description: 'Recipe Test2 Description'
        }]
        res.render('home', {recipes: recipes});

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    loadRecipe
}