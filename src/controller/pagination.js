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


const student_list = (req, res) => {
    try {
        const p = req.query.page || 1;
        const limit = 200;
        const order = req.query.sort === 'desc' ? 'desc' : 'asc';
        const order_by = req.query.select || 'id';
        const offset = (p - 1) * limit;
        const lastpage = Math.ceil(49575 / limit);

        sql = `select * ,DATE_FORMAT(birth_date, "%d/%m/%Y") as birth_date,
    DATE_FORMAT(created_at, "%d/%m/%Y %T") as created_at
    from student_master order by ${order_by} ${order} limit ${limit} offset ${offset}`;

        con.query(sql, (err, result) => {
            if (err) console.log(err);
            res.render('student_list', { result, p, order_by, order, lastpage });
            // console.log(result);
        })
    } catch (err) {
        console.log(err);
    }
}
module.exports = student_list;