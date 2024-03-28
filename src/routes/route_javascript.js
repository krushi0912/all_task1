var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {dynamic,kukucube,tic,events} = require('../controller/javascript');
const js = express.Router();

js.route("/dynamic").get(dynamic);
js.route("/kukucube").get(kukucube);
js.route("/tic").get(tic);
js.route("/events").get(events);


module.exports = js;