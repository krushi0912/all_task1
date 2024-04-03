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

const searching = async (req, res) => {
    const p = req.query.page || 1;
    const limit = 10;
    const offset = (p - 1) * limit;
    const lastpage = Math.ceil(200 / limit);
    const { id, firstname, lastname, gender, city, operate } = req.query;

    var sql = `select * ,DATE_FORMAT(birth_date, "%d/%m/%Y") as birth_date,
            DATE_FORMAT(created_at, "%d/%m/%Y %T") as created_at
            from student_master`;
    var data = "";

    const key = Object.keys(req.query);
    key.forEach((k) => {
        // console.log(k);
        if (!sql.includes('where')) sql += ' where';
        if (k === 'id' && k != 'page') sql += ` ${k} = "${req.query[k]}"`;
        if (req.query[k] && k != 'operate' && k != 'id' && k != 'page') sql += ` ${k} = "${req.query[k]}" ${req.query['operate']}`;
    });

    if (req.query['operate'] === 'and') data = sql.slice(0, -4);
    if (req.query['operate'] === 'or') data = sql.slice(0, -3);
    if (!data && p != 1) sql = sql.slice(0, -5);

    data ? con.query(data, (err, result) => {
        if (err) console.log(err);
        else {
            const query2 = data + ` limit ${limit} offset ${offset}`;
            con.query(query2, (err, result) => {
                if (err) console.log(err);
                else {
                    res.render('searching', { result, p, lastpage, firstname, lastname, city, gender, operate });
                }
            })
            // console.log(result);
        }
    }) :
        con.query(sql, (err, result) => {
            if (err) console.log(err);
            else {
                const query2 = sql + ` limit ${limit} offset ${offset}`;
                con.query(query2, (err, result) => {
                    if (err) console.log(err);
                    else {
                        res.render('searching', { result, p, lastpage, firstname, lastname, city, gender, operate });
                    }
                })
                // console.log(result);
            }
        })
};

const delimeter_search = async (req, res) => {
    try {
        var sql = `select * ,DATE_FORMAT(birth_date, "%d/%m/%Y") as birth_date,
                DATE_FORMAT(created_at, "%d/%m/%Y %T") as created_at
                from student_master`;

        const input = req.query.input;

        let arr = [];
        let curr = '';
        if (req.query.input) {
            for (let i = 0; i < input.length; i++) {
                if (input[i] === '_' || input[i] === '^' || input[i] === '$' || input[i] === '#' || input[i] === ':') {
                    if (curr != "") {
                        arr.push(curr);
                        curr = "";
                    }
                    curr += input[i];
                } else {
                    curr += input[i];
                    if (i === input.length - 1 || input[i + 1] === '_' || input[i + 1] === '^' || input[i + 1] === '$' || input[i + 1] === '#' || input[i + 1] === ':') {
                        arr.push(curr);
                        curr = "";
                    }
                }
            }
        }


        var fname = [];
        var lname = [];
        var emailid = [];
        var gen = [];
        var citycode = [];

        arr.forEach((e) => {
            if (!sql.includes('where')) sql += ` where `;
            if (e.charAt(0) == '_') fname.push(`firstname like '%${e.slice(1)}%'`);
            if (e.charAt(0) == '^') lname.push(`lastname like '%${e.slice(1)}%'`);
            if (e.charAt(0) == '$') emailid.push(`email like '%${e.slice(1)}%'`);
            if (e.charAt(0) == '#') gen.push(`gender like '%${e.slice(1)}%'`);
            if (e.charAt(0) == ':') citycode.push(`city like '%${e.slice(1)}%'`);
        });
        // console.log(fname);
        if (fname.length > 0) sql += fname.join(" OR ") + " AND ";
        if (lname.length > 0) sql += lname.join(" OR ") + " AND ";
        if (emailid.length > 0) sql += emailid.join(" OR ") + " AND ";
        if (gen.length > 0) sql += gen.join(" OR ") + " AND ";
        if (citycode.length > 0) sql += citycode.join(" OR ") + " AND ";

        if (sql.includes('where')) sql = sql.slice(0, -4);

        con.query(sql, (err, result) => {
            if (err) console.log(err);
            else {
                res.render('delimeter_search', { result, input });
            }
        })
    }
    catch (err) {
        res.send(err);
    }

}

module.exports = { searching, delimeter_search };