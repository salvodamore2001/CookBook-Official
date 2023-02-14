const express = require('express');
const recipe_route = express();

recipe_route.set('view engine', 'ejs');
recipe_route.set('views','./views/users');

recipe_route.use(express.static('public'));

const auth = require("../middleware/auth");

const recipeController = require('../controllers/recipeController');
const userController = require('../controllers/userController');

recipe_route.get('/recipes',recipeController.loadRecipe);

recipe_route.get('/recipes/:id', recipeController.loadPost);

recipe_route.post('/add-comment', recipeController.addComment);

module.exports = recipe_route;