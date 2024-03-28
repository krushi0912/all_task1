var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const fetchdata = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','fetchdata.html'))
    } catch (error) {
        console.log(error);
    }
}

const fetchuser = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','Fetchapi_user.html'))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {fetchdata,fetchuser};


