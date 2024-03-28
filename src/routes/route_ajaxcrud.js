var express = require('express');
var bodyParser = require('body-parser');
const con = require('../config/connect');
const {ajax_getform,ajax_submitform,listdata,ajax_employeedata, ajax_updatedata} = require('../controller/Ajaxcrud');
const ajax_crud = express.Router();

ajax_crud.route("/ajax_form").get(ajax_getform);
ajax_crud.route("/ajax_submit").post(ajax_submitform);
ajax_crud.route("/listdata").get(listdata);
ajax_crud.route("/listdata/:id").get(ajax_employeedata);
ajax_crud.route("/listdata/:id/update").post(ajax_updatedata);


module.exports = ajax_crud;