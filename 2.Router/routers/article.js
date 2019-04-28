const express = require('express');

const route = express.Router();

route.use((req,res,next)=>{
    console.log("Article Middleware");
    next();
})

route.get('/list',(req,res)=>{
    res.send('Article List');
})

route.get('/example',(req,res)=>{
    res.send('Article Example');
})

module.exports = route;