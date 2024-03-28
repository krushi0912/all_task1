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
        if(req.cookies.token) res.sendFile(path.join(__dirname, '../../public','pages','Task1_box.html'))
        else res.render("login")
    } catch (err) {
        res.send(err);
    }
}
const kukucube = async (req,res)=>{
    try {
        if(req.cookies.token) res.sendFile(path.join(__dirname, '../../public','pages','Task2_box_game.html'))
        else res.render("login")
    } catch (err) {
        res.send(err);
    }
}
const tic = async (req,res)=>{
    try {
        if(req.cookies.token) res.sendFile(path.join(__dirname, '../../public','pages','tic-tac-toe.html'))
        else res.render("login")
    } catch (err) {
        res.send(err);
    }
}
const events = async (req,res)=>{
    try {
        if(req.cookies.token) res.sendFile(path.join(__dirname, '../../public','pages','jsevents.html'))
        else res.render("login")
    } catch (err) {
        res.send(err);
    }
}
const sorting = async (req,res)=>{
    try {
        if(req.cookies.token) res.sendFile(path.join(__dirname, '../../public','pages','sorting2.html'))
        else res.render("login")
        
    } catch (err) {
        res.send(err);
    }
}
module.exports = {dynamic,kukucube,tic,events,sorting}