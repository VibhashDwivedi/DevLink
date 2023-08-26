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

//sort by date and time in descending order
myschema.index({date:-1,time:-1});

module.exports = model('posts', myschema);