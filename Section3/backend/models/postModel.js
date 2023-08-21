const {model, Schema}= require('../connection');

const myschema = new Schema({
  title:String,
content: String,
username:String,
avatar:String,
likes: { type: Number, default: 0 , min:0},
date: String,
time: String, 
profile:String,
});
module.exports = model('posts', myschema);