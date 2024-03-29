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

var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function random(n) {
    let salt = '';
    for (let i = 0; i < n; i++) {
        salt += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return salt;
}

const getregister = async (req,res)=>{
    try {
        if(req.cookies.token) res.render("home");
        else res.render("form")
    } catch (err) {
        res.send(err);
    }
}

const postregister = async (req,res)=>{
    try {

        var { firstname, lastname, contact, email } = req.body;

        sql2 = `select * from users where Email_id = ?`
        data = await con.promise().query(sql2, [email]);
        let result2 = data[0];

        if (result2.length !== 0) {
            return res.json({ msg: "Already Registered!!" })
        } else {
            sql = 'insert into users (`Firstname`,`Lastname`,`Contact`,`Email_id`,`salt`,`access_key`) values (?,?,?,?,?,?)';
            data = await con.promise().query(sql, [firstname, lastname, contact, email, random(4), random(12)]);
            id = data[0].insertId;
        }

        data = await con.promise().query(`select * from users where id = ${id}`);
        var result = data[0][0];

        res.render("accesskey", { result });
    } catch (err) {
        res.send(err);
    }
}

const getpassword = async (req,res)=>{
    try {
        var id = req.query.id;
        var accesskey = req.query.accesskey;
        data = await con.promise().query(`select * from users where id = ${id}`);
        var result = data[0][0];
        let diff = new Date().valueOf() - result.created_time.valueOf();
        let min = Math.floor(diff / (1000*60));
        res.render("password", { result, min, accesskey });
    } catch (err) {
        res.send(err);
    }
}

const postpassword = async (req,res)=>{
    try {
        var { salt, id, accesskey, password, retype_password } = req.body;
        if (password === retype_password) {
            password = password + salt;
            let md5password = md5(password);
            sql2 = 'update users set _password = ?,created_time=now() where id = ? and access_key = ?';
            await con.promise().query(sql2, [md5password, id, accesskey]);
            res.json({ msg: "hello" });
        }
    } catch (err) {
        res.send(err);
    }
}

const getlogin = async (req,res)=>{
    res.render("login");
}
const postlogin = async (req,res)=>{
    try {
        var { Email_id, password } = req.body;
        sql = 'select * from users where Email_id = ?';
        data = await con.promise().query(sql, [Email_id]);
        result = data[0][0];
        if (data[0].length === 0) {
            res.json({ msg: "Email or Password was wrong!!" });
        }
        else {
            mdpass = md5(password + result.salt);
            if (result._password === mdpass) {
                const token = jwt.sign({ Email_id }, `logindata`, { expiresIn: '1h' })
                res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                res.json({ msg: "welcome!" });
            } else {
                res.json({ msg: "Email or Password was wrong!!" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getverifyemail = async (req,res)=>{
    try{
        res.render("verifyemail");
    }catch(err){
        res.send(err);
    }
}
const postverifyemail = async (req,res)=>{
    try{
        email = req.body.Email_id;

    sql2 = `update users set salt = ? , access_key = ? where Email_id = ?`;
    // console.log(random(4));
    await con.promise().query(sql2, [random(4), random(12), email]);

    sql = "select * from users where Email_id = ?";
    data = await con.promise().query(sql, [email]);
    result = data[0][0];

    if (data[0].length !== 0) {
        res.render("newlink", { result });
    } else {
        res.json({ msg: "You are not Registered User." })
    }
    }catch(err){
        res.send(err);
    }
}

const generatenewtoken = async (req,res,next)=>{
    try{
        const {accesskey,id} = req.query;
        const isuser = await con.promise().query('select * from users where access_key = ?',[accesskey]);
        result = isuser[0][0]
        if(isuser[0].length === 0) return res.send("token not valid");
        let update_accesskey = random(12);
        const update_data = await con.promise().query('update users set access_key =?,created_time = now() where access_key = ?',[update_accesskey,accesskey]);
        res.send(`<a href="http://localhost:9013/password/?accesskey=${update_accesskey}&id=${result.id}">Change Password</a>`);
    }catch(err){
        console.log(err);
    }
}

const home = async (req,res)=>{
    try {
        res.render("home")
    } catch (err) {
        res.send(err);
    }
}

const logout = async (req,res)=>{
    try{
        res.clearCookie('token');
        res.render("login");
    }catch(err){
        res.send(err);
    }
}


module.exports = { postregister, postlogin, getpassword,postpassword,getlogin,getregister,getverifyemail,postverifyemail,generatenewtoken,home,logout};



