var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {searching ,delimeter_search}= require('../controller/searching');
const search = express.Router();

search.route("/searching").get(searching);
search.route("/delimeter_search").get(delimeter_search);


module.exports = search;