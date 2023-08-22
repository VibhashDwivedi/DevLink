const mongoose = require('mongoose');




const url ="mongodb+srv://vibhashdwivedi:root@cluster0.bxwasco.mongodb.net/devlinkdb?retryWrites=true&w=majority"


mongoose.connect(url)
.then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;
