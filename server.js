var express = require('express');
var bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const l = require('./src/routes/route_authentication');
const con = require('./src/config/connect');
const js = require('./src/routes/route_javascript');
const pagination = require('./src/routes/route_pagination');
const search = require('./src/routes/route_searching');
const crud = require('./src/routes/route_CRUD');
const ajax_crud = require('./src/routes/route_ajaxcrud');
const other = require('./src/routes/route_others');

var app = express();
app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",l);
app.use("/jstask",js);
app.use("/pagination",pagination);
app.use("/search",search);
app.use("/crud",crud);
app.use("/ajax_crud",ajax_crud);
app.use("/other",other);

app.listen(9013);