const {model, Schema}= require('../connection');

const myschema = new Schema({
    userId: String,
    following: String,
    });
    
  module.exports = model('follows', myschema);