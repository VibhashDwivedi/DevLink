const express = require('express');

const app = express();
const port = 8000;

app.get('/',(req, res)=>{
    res.send("hello from the server!!");
})

app.get('/about',(req, res)=>{
    res.send("about the server!!");
})

app.post('/submit', (req, res)=>{
    const data = req.data.data;
    // save it the the database and
    res.send("success saved to the db");
})

app.listen(8000, ()=>{
    console.log("server listening on 8000");
})