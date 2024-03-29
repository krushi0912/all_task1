var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {student_list,attendance_report,exam_report,student_result, dynamic_grid} = require('../controller/pagination');
const isvaliduser = require('../middleware/token');
const pagination = express.Router();


pagination.route("/student_list").get(isvaliduser,student_list);
pagination.route("/attendance_report").get(isvaliduser,attendance_report);
pagination.route("/exam_report").get(isvaliduser,exam_report);
pagination.route("/exam_report/reportcard").get(isvaliduser,student_result);
pagination.route("/dynamic_grid").get(isvaliduser,dynamic_grid);


module.exports = pagination;