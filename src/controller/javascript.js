var express = require('express');
var bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const con = require('../config/connect');

var app = express();
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const dynamic = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','Task1_box.html'))
    } catch (err) {
        res.send(err);
    }
}
const kukucube = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','Task2_box_game.html'))
    } catch (err) {
        res.send(err);
    }
}
const tic = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','tic-tac-toe.html'))
    } catch (err) {
        res.send(err);
    }
}
const events = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','jsevents.html'))
    } catch (err) {
        res.send(err);
    }
}
module.exports = {dynamic,kukucube,tic,events}