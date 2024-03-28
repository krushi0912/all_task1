var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {fetchdata,fetchuser} = require('../controller/other');
const other = express.Router();

other.route("/fetchdata").get(fetchdata);
other.route("/fetchdata/:id").get(fetchuser);


module.exports = other;