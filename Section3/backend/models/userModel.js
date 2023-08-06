const {model, Schema}= require('../connection');

const myschema = new Schema({
    username: String,
    profile: String,
    email: String,
    password: String,
});
module.exports = model('users', myschema);