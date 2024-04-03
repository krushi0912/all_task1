var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {ajax_getform,ajax_submitform,listdata,ajax_employeedata, ajax_updatedata} = require('../controller/ajaxcrud');
const isvaliduser = require('../middleware/token');
const ajax_crud = express.Router();

ajax_crud.route("/ajax_form").get(isvaliduser,ajax_getform);
ajax_crud.route("/ajax_submit").post(isvaliduser,ajax_submitform);
ajax_crud.route("/listdata").get(isvaliduser,listdata);
ajax_crud.route("/listdata/:id").get(isvaliduser,ajax_employeedata);
ajax_crud.route("/listdata/:id/update").post(isvaliduser,ajax_updatedata);


module.exports = ajax_crud;