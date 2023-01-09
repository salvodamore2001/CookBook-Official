const Recipe = require('../models/recipeModels');

const loadRecipe = async(req,res)=>{

try {
    
    const recipe = await Recipe.find({});
    res.render('recipes',{recipes:recipe});

} catch (error) {
    console.log(error.message);
}

}

const loadPost = async(req,res)=>{

    try {
        
        const posts = await Recipe.findOne({"_id":req.params.id})

        res.render('posts',{recipes:posts});

    } catch (error) {
        console.log(error.message);
    }

}

const addComment = async(req,res)=>{
    try {
        res.status(200).send({success:true,msg: 'Comment added!'});
    } catch (error) {
       res.status(200).send({success:false,msg:error.message});
    }
}

module.exports = {
    loadRecipe,
    loadPost,
    addComment
}