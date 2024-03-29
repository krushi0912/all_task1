
var express = require('express');
var bodyParser = require('body-parser');
const { postregister, postlogin,getpassword,postpassword,getlogin,getregister,home} =  require('../controller/authentication');
const con = require('../config/connect');
const isvaliduser = require('../middleware/token');
const login = express.Router();

login.route("/").get(getregister);
login.route("/register").post(postregister);
login.route("/password").get(getpassword).post(postpassword);
login.route("/login").get(getlogin).post(postlogin);
login.route("/home").get(isvaliduser,home);

module.exports = login;