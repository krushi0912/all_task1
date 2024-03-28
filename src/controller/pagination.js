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
        const limit = 20;
        const order = req.query.sort === 'desc' ? 'desc' : 'asc';
        const order_by = req.query.select || 'id';
        const offset = (p - 1) * limit;
        const lastpage = Math.ceil(200 / limit);

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

const attendance_report = (req, res) => {
    const p = req.query.page || 1;
    const offset = (p - 1) * 20;
    const lastpage = Math.ceil(200 / 20);
    const m = req.query.month || 'december2023';
    const y = m.slice(0, -4);

    sql = `select s.id,s.firstname,monthname(a._date) as month,count(a.ispresent)as presentDay from student_master as s
    inner join attendance_master as a on s.id = a.stu_id where a.ispresent = 'P' group by id,month having month="${y}" order by a.stu_id limit 20 offset ${offset}`;

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        res.render('attendance', { result, p, m, lastpage });
    })
};

const exam_report = (req, res) => {
    const p = req.query.page || 1;
    const limit = 60;
    const offset = (p - 1) * limit;
    const lastpage = Math.ceil(600 / 60);
    sql = `select e.stu_id , s.firstname ,t.exam_type , sum(e.obtain_theory_marks) as theory,sum(e.practical_obtain_marks) as practical from exam_result as e inner join student_master as s on e.stu_id = s.id inner join exam_type as t on e.e_type = t.e_id group by t.e_id , s.id order by e.stu_id limit ${limit} offset ${offset}`;

    con.query(sql, (err, result) => {
        if (err) console.log(err);
        else
            res.render('examresultlist', { result, p, lastpage });
    })
}

const student_result = (req, res) => {
    id = req.query.id;
    sql = `select s.id,s.firstname,sub.sub_name,e.e_type,e.obtain_theory_marks as theory,e.practical_obtain_marks as practical
    from student_master as s inner join exam_result as e on e.stu_id = s.id 
    inner join subject_master as sub on sub.sub_id = e.sub_id where e.stu_id = ${id};`;

    sql2 = `select count(*) as attendance from attendance_master where stu_id = ${id} and ispresent = 'P';`
    con.query(sql, (err, result) => {
        if (err) console.log(err);
        con.query(sql2, (err, result2) => {
            if (err) console.log(err);
            res.render('reportcard', { result, result2 });
        })
    })
}

const dynamic_grid = (req, res) => {
    try {
        const result = [];
        if (req.query.textquery) {
            const p = req.query.page || 1;
            var sql = req.query.textquery;

            con.query(sql, (err, result) => {
                if (err) res.send(err);
                else {
                    const limit = 30;
                    const lastpage = Math.ceil(result.length / limit);
                    const offset = (Number(p) - 1) * limit;
                    if (sql.includes('limit')) {
                        const key = Object.keys(result[0]);
                        res.render('dynamicgrid', { result, key, sql, p, lastpage });
                    } else {
                        var sql2 = sql + ` limit ${limit} offset ${offset}`;
                        const key = Object.keys(result[0]);
                        con.query(sql2, (err, result) => {
                            if (err) res.send(err);
                            else
                                res.render('dynamicgrid', { result, key, sql, sql2, p, lastpage });
                        })
                    }
                }
            })
        } else {
            res.render('dynamicgrid', { result });
        }
    } catch (err) {
        res.send(err);
    }
}
module.exports = { student_list, attendance_report, exam_report, student_result,dynamic_grid};