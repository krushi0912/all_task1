var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const student_list = require('../controller/pagination');
const pagination = express.Router();

pagination.route("/student_list").get(student_list);


module.exports = pagination;