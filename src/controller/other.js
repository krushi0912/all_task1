var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const con = require('../config/connect');

var app = express();
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const fetchdata = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','fetchdata.html'))
    } catch (error) {
        console.log(error);
    }
}

const fetchuser = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','Fetchapi_user.html'))
    } catch (error) {
        console.log(error);
    }
}

const state_city = async (req,res)=>{
    try{
        res.render("state_city_list");
    }catch(err){
        res.send(err);
    }
}
const statedata = async (req,res)=>{
    try{
        sql = `select * from state`;
        data = await con.promise().query(sql);
        result = data[0];
        // console.log(result);
        // res.render("list",{result});
        res.send(result);
    }catch(err){
        res.send(err);
    }
}

const citydata = async(req,res)=>{
    try{
        sql1 = `select * from city where state_id = ${req.params.state}`;
        // console.log(req.params.id);
        data = await con.promise().query(sql1);
        result2 = data[0];
        res.send(result2);
    }catch(err){
        res.send(err);
    }
}

module.exports = {fetchdata,fetchuser,state_city,statedata,citydata};


