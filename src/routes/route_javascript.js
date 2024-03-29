var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {dynamic,kukucube,tic,events,sorting} = require('../controller/javascript');
const isvaliduser = require('../middleware/token');
const js = express.Router();

js.route("/dynamic").get(isvaliduser,dynamic);
js.route("/kukucube").get(isvaliduser,kukucube);
js.route("/tic").get(isvaliduser,tic);
js.route("/events").get(isvaliduser,events);
js.route("/sorting").get(isvaliduser,sorting);


module.exports = js;