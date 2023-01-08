const express = require('express');
const recipe_route = express();

recipe_route.set('view engine', 'ejs');
recipe_route.set('views','./views/users');

recipe_route.use(express.static('public'));

const auth = require("../middleware/auth");

const recipeController = require('../controllers/recipeController');

recipe_route.get('/recipes',recipeController.loadRecipe);

module.exports = recipe_route;