var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {fetchdata,fetchuser,state_city,statedata, citydata,timezone} = require('../controller/other');
const other = express.Router();

other.route("/fetchdata").get(fetchdata);
other.route("/fetchdata/:id").get(fetchuser);
other.route("/state_city").get(state_city);
other.route("/state").get(statedata);
other.route("/city/:state").get(citydata);
other.route("/timezone").get(timezone);



module.exports = other;