const {model, Schema}= require('../connection');

const myschema = new Schema({
    username: String,
    postId: String,
    });
    
  module.exports = model('likes', myschema);