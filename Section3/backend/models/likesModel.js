const {model, Schema}= require('../connection');

const myschema = new Schema({
    userId: String,
    postId: String,
    });
    
  module.exports = model('likes', myschema);