var express = require('express');
var bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const l = require('./src/routes/authentication');
const con = require('./src/config/connect');
const js = require('./src/routes/javascript');

var app = express();
app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",l);
app.use("/jstask",js);

app.listen(9013);