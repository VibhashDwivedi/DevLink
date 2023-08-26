const express = require('express');
const cors = require('cors');


const app = express();
const port = 8000;

const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')
const likesRouter = require('./routers/likesRouter')
const followRouter = require('./routers/followRouter')

const utilRouter = require('./routers/util');

const req = require('express/lib/request');


app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(express.json());

app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/util', utilRouter);
app.use('/likes',likesRouter);
app.use('/follow',followRouter);





app.use(express.static('./uploads'));


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