var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {student_list,attendance_report,exam_report,student_result, dynamic_grid} = require('../controller/pagination');
const pagination = express.Router();

pagination.route("/student_list").get(student_list);
pagination.route("/attendance_report").get(attendance_report);
pagination.route("/exam_report").get(exam_report);
pagination.route("/exam_report/reportcard").get(student_result);
pagination.route("/dynamic_grid").get(dynamic_grid);


module.exports = pagination;