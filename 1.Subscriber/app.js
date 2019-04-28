const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const subscriberModel = require('./models/subscriber');
const joi = require('@hapi/joi');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { err: null });
})

app.post('/', (req, res) => {
    const schema = joi.object().keys({
        email: joi.string().trim().email().min(10).required(),
        password : joi.string().required()
    });

    joi.validate(req.body, schema, (err, result) => {
        if (err) {
            console.log(err);
            res.render('index', { err });
        }else{
            subscriberModel.addNewEmail(result.email);
            res.redirect('/list');
        }
    });
    
})

app.get('/list', (req, res) => {
    const data = subscriberModel.readEmails();
    res.render('list', { emails: data.emails })
});


app.listen(3001);