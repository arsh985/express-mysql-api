const express = require('express');
const bodyParser = require('body-parser');
const login = require('./src/user.routes');
//const bcrypt = require('bcrypt');
const mysql = require('./db')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//var router = express.Router();

app.get('/', function(req, res) {
    res.send("<h1>Connected Successfully</h1>")
});

app.post('/register',require('./src/user.routes'));
app.post('/login',require('./src/user.routes'))
// app.use('/api', router);

app.listen(3000, ()=> {
    console.log('Server Running on port 3000')
});