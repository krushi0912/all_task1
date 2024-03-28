var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {getform,submitform,employeedata,updatedata}= require('../controller/CRUD');
const crud = express.Router();

crud.route("/form").get(getform);
crud.route("/submit").post(submitform);
crud.route("/submit/:id").get(employeedata);
crud.route("/submit/:id/update").post(updatedata);


module.exports = crud;