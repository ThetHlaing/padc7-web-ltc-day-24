const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const subscriberModel = require('./models/subscribers');
const Joi = require('@hapi/joi');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render('index',{err : null});
})

app.post('/', (req, res) => {
    const schema = Joi.object().keys({
        email : Joi.string().trim().min(5).email().required()
    })

    Joi.validate(req.body,schema,(err,result)=>{
        if(err){
            res.render('index', { err});
        }
        else{
            subscriberModel.addEmail(result.email);
            res.redirect('/list');
        }
    });   
});

app.get('/list', (req, res) => {

    const data = subscriberModel.getAllSubscribers();
    res.render('list', { data: data.emails });

});

app.listen(3001);