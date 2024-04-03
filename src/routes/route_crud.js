var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {getform,submitform,employeedata,updatedata}= require('../controller/crud');
const isvaliduser = require('../middleware/token');
const crud = express.Router();

crud.route("/form").get(isvaliduser,getform);
crud.route("/submit").post(isvaliduser,submitform);
crud.route("/submit/:id").get(isvaliduser,employeedata);
crud.route("/submit/:id/update").post(isvaliduser,updatedata);


module.exports = crud;