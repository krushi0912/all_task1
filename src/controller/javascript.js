var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const dynamic = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','dynamic_box.html'))
    } catch (err) {
        res.send(err);
    }
}
const kukucube = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','kukucube.html'))
    } catch (err) {
        res.send(err);
    }
}
const tic = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','tic_tac_toe.html'))
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
const sorting = async (req,res)=>{
    try {
        res.sendFile(path.join(__dirname, '../../public','pages','sorting.html'))
    } catch (err) {
        res.send(err);
    }
}


module.exports = {dynamic,kukucube,tic,events,sorting}