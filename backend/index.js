const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
const port = 8000;
const url = "https://devlink-project.onrender.com";

const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')
const likesRouter = require('./routers/likesRouter')
const followRouter = require('./routers/followRouter')

const utilRouter = require('./routers/util');

const req = require('express/lib/request');


app.use(cors({
    origin: ['https://dev-link-project.vercel.app']
}));
app.use(express.json());

app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/util', utilRouter);
app.use('/likes',likesRouter);
app.use('/follow',followRouter);

// const interval = 3000000;

// function reloadWebsite() {
//   axios.get(url)
//     .then(response => {
//       console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
//     })
//     .catch(error => {
//       console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
//     });
// }

// setInterval(reloadWebsite, interval);





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