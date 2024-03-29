var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {searching ,delimeter_search}= require('../controller/searching');
const isvaliduser = require('../middleware/token');
const search = express.Router();

search.route("/searching").get(isvaliduser,searching);
search.route("/delimeter_search").get(isvaliduser,delimeter_search);


module.exports = search;