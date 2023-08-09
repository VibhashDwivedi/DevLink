const {model, Schema}= require('../connection');

const myschema = new Schema({
  title:String,
content: String,
username:String,
});
module.exports = model('posts', myschema);