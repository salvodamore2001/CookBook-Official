const User = require('../models/userModels');
const Recipe = require('../models/recipeModels');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const config = require("../config/config");

const randomstring = require("randomstring");

const securePassword = async(password)=>{

    try {
        
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }

}

//for send mail
const sendVerifyMail = async(nickname, email, user_id)=>{

    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        });
        const mailOptions = {
            from:'salvodamore2301@gmail.com',
            to:email,
            subject:'For Verification mail',
            html:'<p>Hii '+nickname+', please click here to <a href="http://127.0.0.1:3000/verify?id='+user_id+'"> Verify </a> your mail.</p>'
        }
        transporter.sendMail(mailOptions, function(error,info){
            if (error) {
                console.log(error);
            } else {
                console.log("Email has been sent:- ",info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }

}

//for reset password send mail
const sendResetPasswordMail = async(nickname, email, token)=>{

    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        });
        const mailOptions = {
            from:config.emailUser,
            to:email,
            subject:'For Reset Password',
            html:'<p>Hii '+nickname+', please click here to <a href="http://127.0.0.1:3000/forget-password?token='+token+'"> Reset </a> your password.</p>'
        }
        transporter.sendMail(mailOptions, function(error,info){
            if (error) {
                console.log(error);
            } else {
                console.log("Email has been sent:- ",info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }

}

const loadRegister = async(req,res)=>{
    try {
        
        res.render('login-signup');

    } catch (error) {
        console.log(error.message);
    }
}

const insertUser = async(req,res)=>{
    try {
        const spassword = await securePassword(req.body.password);
        const cspasssword = await securePassword(req.body.cpassword);
        const user = new User({
            nickname:req.body.nickname,
            email:req.body.email,
            password:spassword,
            cpassword:cspasssword,
            is_admin:0,
        });

        const userData = await user.save();

        if (userData){
            sendVerifyMail(req.body.nickname, req.body.email, userData._id);
            res.render('login-signup',{message:"Your registragtion has been successfully. Please verify your mail"});
        } 
        else {
            res.render('login-signup',{message:"Your registragtion has been failed"});
        }

    } catch (error) {
        console.log(error.message);
    }
}

const verifyMail= async(req,res)=>{
    try {
        
        const updateInfo = await User.updateOne({_id:req.query.id},{ $set:{ is_varified:1} });

        console.log(updateInfo);
        res.render("email-verified");

    } catch (error) {
        console.log(error.message);
    }
}

// login user methods started

const loginLoad = async (req,res)=>{

    try {
        
        res.render('login-signup');

    } catch (error) {
        console.log(error.message);
    }

}

const verifyLogin = async(req,res)=>{

    try {
        
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});

        if (userData) {
            
            const passwordMatch = await bcrypt.compare(password,userData.password);
            if (passwordMatch) {
                if (userData.is_varified === 0) {
                    res.render('login-signup',{message:"Please verify your mail."});
                } else {
                    req.session.user_id = userData._id;
                    res.redirect('/home');
                }
            } else {
                res.render('login-signup',{message:"Email and password is incorrect"});
            }

        } else {
            res.render('login-signup',{message:"Email and password is incorrect"});
        }

    } catch (error) {
        console.log(error.message);
    }

}

const loadHome = async(req,res)=>{
    
    try {
        
        res.render('index');

    } catch (error) {
        console.log(error.message);
    }
}

const loadHomeLogged = async (req,res)=>{

    try {
        const userData = await User.findById({_id:req.session.user_id });
        res.render('indexLogged',{user:userData});

    } catch (error) {
        console.log(error.message);
    }

}

const userLogout = async(req,res)=>{

    try {
        
        req.session.destroy();
        res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }

}

//forget password code start

const forgetLoad = async(req,res)=>{

    try {
        
        res.render('forget');

    } catch (error) {
       console.log(error.message); 
    }

}

const forgetVerify = async(req,res)=>{

    try {
        
        const email = req.body.email;
        const userData = await User.findOne({email:email});
        if (userData) {
            if (userData.is_varified === 0) {
                res.render('forget',{message:"Please verify your mail."});
            } else {
                const randomString = randomstring.generate();
                const updateData = await User.updateOne({email:email}, {$set:{token:randomString}});
                sendResetPasswordMail(userData.nickname,userData.email,randomString);
                res.render('forget',{message:"Please check your mail to reset your password."});
            }
        } else {
            res.render('forget',{message:"User mail is incorrect."});
        }

    } catch (error) {
        console.log(error.message);
    }

}

const forgetPasswordLoad = async(req,res)=>{

    try {
        
        const token = req.query.token;
        const tokenData = await User.findOne({token:token});
        if (tokenData) {
            res.render('forget-password',{user_id:tokenData._id});
        } else {
            res.render('404',{message:"Token is invalid"});
        }

    } catch (error) {
        console.log(error.message);
    }

}

const resetPassword = async(req,res)=>{

try {
    
    const password = req.body.password;
    const user_id = req.body.user_id;

    const secure_password = await securePassword(password);

    const updateData = await User.findByIdAndUpdate({_id:user_id},{$set:{password:secure_password, token:''}});

    res.redirect("/login");

} catch (error) {
    console.log(error.message);
}

}


/*const editLoad = async(req,res)=>{

    try {
        
        const id = req.query.id;

        const userData = await User.findById({_id:id});

        if(userData){
        res.render('edit',{user:userData});
        }
        else {
            res.redirect('/home');
        }

    } catch (error) {
        console.log(error.message);
    }
    
    }

    const updateProfile = async (req,res)=>{
        try {
            const userData = await User.findOneAndUpdate({_id:req.query.id},{$set: {'nickname':req.body.nickname}});
            
            res.redirect('/home');

        } catch (error) {
            console.log(error.message);
        }
    }*/

    const loadRecipeDashboard = async(req,res)=>{
        
        try {
            
            res.render('newRecipePage');

        } catch (error) {
            console.log(error.message);
        }

    }

    const addRecipe = async(req,res)=>{
        
        try {
            
            var image = '';
            if(req.body.image !== undefined){
                image = req.body.image;
            }

            const recipe = new Recipe({
                title: req.body.title,
                description: req.body.description,
                ingredients: req.body.ingredients,
                image:image
            });

            const recipeData = await recipe.save();
            if(recipeData){
                res.render('newRecipePage',{message:'Recipe added successfully!!'});
            }
            else{
                res.render('newRecipePage',{message:'Error!!'});
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    const uploadRecipeImage = async(req,res)=>{
        try {
            
            var imagePath = '../public/images';
            imagePath = imagePath+'/'+req.file.filename;

            res.send({success:true,msg:'Recipe Image upload successfully!',path:imagePath});

        } catch (error) {
            res.send({success:false,msg:error.message});
        }
    }

module.exports = {
    loadRegister,
    insertUser,
    verifyMail,
    loginLoad,
    verifyLogin,
    loadHome,
    loadHomeLogged,
    userLogout,
    forgetLoad,
    forgetVerify,
    forgetPasswordLoad,
    resetPassword,
    loadRecipeDashboard,
    addRecipe,
    uploadRecipeImage
    //editLoad,
    //updateProfile
}