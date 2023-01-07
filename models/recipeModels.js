const mongoose = require("mongoose");
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const recipeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
      },
      sanitizedHtml: {
        type: String,
        required: true
      }
});

recipeSchema.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
  
    if (this.markdown) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.ingredients))
    }
  
    next()
  })

module.exports = mongoose.model('Recipe',recipeSchema);