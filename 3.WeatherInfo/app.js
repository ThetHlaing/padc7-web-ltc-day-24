//https://openweathermap.org/api

//https://openweathermap.org/appid

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const weatherInfoModel = require("./models/weather_info");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.render("index", {data: null});
})

app.post('/', (req,res)=>{
    const city = req.body.city;
    weatherInfoModel.getInfo(city)
    .then( (data)=>{
        res.render("index", {data : { message : data}});
    })
    .catch(err => {
        res.render("index", {data : { message : err}})
    })
    
})

app.listen(3002);


