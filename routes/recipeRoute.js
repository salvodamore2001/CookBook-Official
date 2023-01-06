const express = require("express");
const recipe_route = express();
const session = require("express-session");

const config = require("../config/config");

recipe_route.use(session({secret:config.sessionSecret}));


recipe_route.set('view engine','ejs');
recipe_route.set('views','./views/users');

const bodyParser = require('body-parser');
recipe_route.use(bodyParser.json());
recipe_route.use(bodyParser.urlencoded({extended:true}))

const multer = require("multer");

const recipeController = require('../controllers/recipeController');
const path = require("path");

recipe_route.get('/recipes',recipeController.loadRecipe);

module.exports = recipe_route;