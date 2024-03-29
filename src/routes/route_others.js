var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {fetchdata,fetchuser,state_city,statedata, citydata,timezone} = require('../controller/other');
const isvaliduser = require('../middleware/token');
const other = express.Router();

other.route("/fetchdata").get(isvaliduser,fetchdata);
other.route("/fetchdata/:id").get(isvaliduser,fetchuser);
other.route("/state_city").get(isvaliduser,state_city);
other.route("/state").get(isvaliduser,statedata);
other.route("/city/:state").get(isvaliduser,citydata);
other.route("/timezone").get(isvaliduser,timezone);

module.exports = other;