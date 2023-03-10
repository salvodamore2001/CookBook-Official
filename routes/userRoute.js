const express = require("express");
const user_route = express();
const session = require("express-session");

const config = require("../config/config");

user_route.use(session({secret:config.sessionSecret}));

const auth = require("../middleware/auth");

user_route.set('view engine','ejs');
user_route.set('views','./views/users');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}))

const multer = require("multer");

const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const path = require("path");

user_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null,path.join(__dirname,'../public/images'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage:storage});

user_route.use(express.static(__dirname + '/public'));
user_route.use('/images', express.static('images'));


user_route.get('/register',auth.isLogout,userController.loadRegister);

user_route.post('/register',userController.insertUser);

user_route.get('/verify',userController.verifyMail);

user_route.get('/',auth.isLogout,userController.loadHome);
user_route.get('/login',auth.isLogout,userController.loginLoad);

user_route.post('/login',userController.verifyLogin);

user_route.get('/home',auth.isLogin,userController.loadHomeLogged);

user_route.get('/logout',auth.isLogin,userController.userLogout);

user_route.get('/forget',auth.isLogout,userController.forgetLoad);

user_route.post('/forget',userController.forgetVerify);

user_route.get('/forget-password',auth.isLogout,userController.forgetPasswordLoad);

user_route.post('/forget-password',userController.resetPassword);

//user_route.get('/edit',auth.isLogin,userController.editLoad);

//user_route.post('/edit',userController.updateProfile);

user_route.get('/public-recipe',auth.isLogin,userController.loadRecipeDashboard);

user_route.post('/public-recipe',auth.isLogin,upload.single('image'),userController.addRecipe);

user_route.post('/upload-post-image',auth.isLogin,upload.single('image'),userController.uploadRecipeImage);

module.exports = user_route;
