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

const getform = async (req, res) => {
    try {
        res.render('job_form');
    } catch (err) {
        console.log(err);
    }
}

const submitform = async (req, res) => {
    try {
        var { firstname, lastname, designation, email, phonenumber, address1, address2, city, state, zipcode, gender, dob, Relationshipstatus } = req.body;
        var { cource, board, passingyear, percentage } = req.body;
        var { companyname, work_designation, fromdate, todate } = req.body;
        var { hindi, h_r, h_w, h_s, english, e_r, e_w, e_s, gujarati, g_r, g_w, g_s } = req.body;
        var { php, tech_php, mysql, tech_mysql, laravel, tech_laravel, oracle, tech_oracle } = req.body;
        var { ref_name, ref_contact, ref_relation } = req.body;
        var { location, notice, department, Expactedctc, currentctc } = req.body;

        var sql = `select o.id,o.select_id,o.option_key from select_master as s inner join option_master as o on s.id = o.select_id`;
        let result = await con.promise().query(sql)
        result[0].forEach(e => {
            if (e.option_key == "Male" && gender == "male") gender = e.id;
            if (e.option_key == "Female" && gender == "female") gender = e.id;
            if (e.option_key == "Single" && Relationshipstatus == "single") Relationshipstatus = e.id;
            if (e.option_key == "Married" && Relationshipstatus == "married") Relationshipstatus = e.id;
            if (e.option_key == 'Hindi' && hindi == "on") hindi = e.id;
            if (e.option_key == 'English' && english == "on") english = e.id;
            if (e.option_key == 'Gujarati' && gujarati == "on") gujarati = e.id;
            if (e.option_key == 'PHP' && php == "on") php = e.id;
            if (e.option_key == 'MYSQL' && mysql == "on") mysql = e.id;
            if (e.option_key == 'Laravel' && laravel == "on") laravel = e.id;
            if (e.option_key == 'Oracle' && oracle == "on") oracle = e.id;
            if (e.option_key == 'Beginer' && tech_php == "Beginer") tech_php = e.id;
            if (e.option_key == 'Mideator' && tech_php == "Mideator") tech_php = e.id;
            if (e.option_key == 'Expert' && tech_php == "Expert") tech_php = e.id;
            if (e.option_key == 'Beginer' && tech_mysql == "Beginer") tech_mysql = e.id;
            if (e.option_key == 'Mideator' && tech_mysql == "Mideator") tech_mysql = e.id;
            if (e.option_key == 'Expert' && tech_mysql == "Expert") tech_mysql = e.id;
            if (e.option_key == 'Beginer' && tech_laravel == "Beginer") tech_laravel = e.id;
            if (e.option_key == 'Mideator' && tech_laravel == "Mideator") tech_laravel = e.id;
            if (e.option_key == 'Expert' && tech_laravel == "Expert") tech_laravel = e.id;
            if (e.option_key == 'Beginer' && tech_oracle == "Beginer") tech_oracle = e.id;
            if (e.option_key == 'Mideator' && tech_oracle == "Mideator") tech_oracle = e.id;
            if (e.option_key == 'Expert' && tech_oracle == "Expert") tech_oracle = e.id;
        });

        var employee_id = 0;
        var sql1 = 'INSERT INTO employee_details(`First_name`, `Last_name`, `Designation`, `Email`, `Phone_number`, `Address_1`, `Address_2`, `City`, `State`, `Zip_code`, `Gender`, `Date_of_Birth`, `Relationship`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        var basic = await con.promise().query(sql1, [firstname, lastname, designation, email, phonenumber, address1, address2, city, state, zipcode, gender, dob, Relationshipstatus]);
        employee_id = basic[0].insertId;

        var sql2 = 'INSERT INTO `education_master` (`emp_id`, `cource`, `board`, `passing_year`, `percentage`) VALUES (?,?,?,?,?)';
        for (let i = 0; i < cource.length; i++) {
            if (cource[i] && board[i] && passingyear[i] && percentage[i]) {
                await con.promise().query(sql2, [employee_id, cource[i], board[i], passingyear[i], percentage[i]]);
            }
        }

        var sql3 = 'INSERT INTO work_experience(`e_id`, `company_name`, `designation`, `from_date`, `to_date`) VALUES (?,?,?,?,?)';

        for (let i = 0; i < companyname.length; i++) {
            if (companyname[i] && work_designation[i] && fromdate[i] && todate[i]) {
                await con.promise().query(sql3, [employee_id, companyname[i], work_designation[i], fromdate[i], todate[i]])
            }
        }

        var sql4 = 'INSERT INTO `languages` (`e_id`, `languages`, `r`, `w`, `s`) VALUES (?,?,?,?,?)';
        if (hindi) {
            if (h_r == "on") { h_r = 1 }
            else { h_r = 0 }
            if (h_w == "on") { h_w = 1 }
            else { h_w = 0 }
            if (h_s == "on") { h_s = 1 }
            else { h_s = 0 }
            await con.promise().query(sql4, [employee_id, hindi, h_r, h_w, h_s]);
        }
        if (english) {
            if (e_r == "on") { e_r = 1 }
            else { e_r = 0 }
            if (e_w == "on") { e_w = 1 }
            else { e_w = 0 }
            if (e_s == "on") { e_s = 1 }
            else { e_s = 0 }
            await con.promise().query(sql4, [employee_id, english, e_r, e_w, e_s]);
        }
        if (gujarati) {
            if (g_r == "on") { g_r = 1 }
            else { g_r = 0 }
            if (g_w == "on") { g_w = 1 }
            else { g_w = 0 }
            if (g_s == "on") { g_s = 1 }
            else { g_s = 0 }
            await con.promise().query(sql4, [employee_id, gujarati, g_r, g_w, g_s]);
        }

        var sql5 = 'INSERT INTO technology(`e_id`, `tech_id`, `tech_level`) VALUES (?,?,?)';
        if (php) await con.promise().query(sql5, [employee_id, php, tech_php]);
        if (mysql) await con.promise().query(sql5, [employee_id, mysql, tech_mysql]);
        if (laravel) await con.promise().query(sql5, [employee_id, laravel, tech_laravel]);
        if (oracle) await con.promise().query(sql5, [employee_id, oracle, tech_oracle]);


        var sql6 = 'INSERT INTO referance_contact (`e_id`,`ref_name`, `ref_number`, `ref_relation`) VALUES (?,?,?,?);';
        for (let i = 0; i < ref_name.length; i++) {
            if (ref_name[i] && ref_contact[i] && ref_contact[i] && ref_relation[i]) {
                await con.promise().query(sql6, [employee_id, ref_name[i], ref_contact[i], ref_relation[i]])
            }
        }

        var sql7 = 'INSERT INTO preferances(`e_id`, `prefered_location`, `notice_period`, `Expected_CTC`, `Current_CTC`, `Department`) VALUES (?,?,?,?,?,?)';
        await con.promise().query(sql7, [employee_id, location, notice, Expactedctc, currentctc, department]);

        var sql8 = `select * from employee_details where Employee_id = ${employee_id}`;
        data = await con.promise().query(sql8);
        result = data[0];
        res.render("job_form_details", { result });
    } catch (err) {
        console.log(err);
    }
}

const employeedata = async (req, res) => {
    try {
        sql = `select * from employee_details where Employee_id = ${req.params.id}`;
        data = await con.promise().query(sql)
        let result = data[0][0];

        sql2 = `select * from education_master where emp_id = ${req.params.id}`;
        data = await con.promise().query(sql2)
        let result2 = data[0];


        sql3 = `select * from work_experience where e_id = ${req.params.id}`;
        data = await con.promise().query(sql3)
        let result3 = data[0];

        hindi = [], english = [], gujarati = [];
        sql5 = `SELECT * FROM languages where e_id = ${req.params.id}`;
        data = await con.promise().query(sql5)
        let result5 = data[0];
        result5.forEach(e => {
            if (e.languages === 8) hindi.push(e);
            if (e.languages === 9) english.push(e);
            if (e.languages === 10) gujarati.push(e);
        })

        php = [], mysql = [], oracle = [], laravel = [];
        sql6 = `SELECT * FROM technology where e_id = ${req.params.id}`;
        data = await con.promise().query(sql6)
        let result6 = data[0];
        result6.forEach(e => {
            if (e.tech_id === 11) php.push(e);
            if (e.tech_id === 12) mysql.push(e);
            if (e.tech_id === 13) laravel.push(e);
            if (e.tech_id === 14) oracle.push(e);
        })

        sql7 = `select * from referance_contact where e_id = ${req.params.id}`;
        data = await con.promise().query(sql7)
        let result7 = data[0];

        sql4 = `select * from preferances where e_id = ${req.params.id}`;
        data = await con.promise().query(sql4)
        let result4 = data[0][0];

        res.render("job_form_update", { result, result2, result3, result4, result5, hindi, english, gujarati, php, mysql, laravel, oracle, result, result7 })
    } catch (err) {
        console.log(err);
    }
}

const updatedata = async (req, res) => {
    try {
        var { firstname, lastname, designation, email, phonenumber, address1, address2, city, state, zipcode, gender, dob, Relationshipstatus } = req.body;
        var { cource, board, passingyear, percentage, edu_type } = req.body;
        var { companyname, work_designation, fromdate, todate, work_id } = req.body;
        var { location, notice, department, Expactedctc, currentctc } = req.body;
        var { ref_name, ref_contact, ref_relation, ref_id } = req.body;
        var { hindi, h_r, h_w, h_s, english, e_r, e_w, e_s, gujarati, g_r, g_w, g_s, lang_id } = req.body;
        var { php, tech_php, mysql, tech_mysql, laravel, tech_laravel, oracle, tech_oracle, tech_id } = req.body;

        var sql = `select o.id,o.select_id,o.option_key from select_master as s inner join option_master as o on s.id = o.select_id`;
        let result = await con.promise().query(sql)
        result[0].forEach(e => {
            if (e.option_key == "Male" && gender == "male") gender = e.id;
            if (e.option_key == "Female" && gender == "female") gender = e.id;
            if (e.option_key == "Single" && Relationshipstatus == "single") Relationshipstatus = e.id;
            if (e.option_key == "Married" && Relationshipstatus == "married") Relationshipstatus = e.id;
            if (e.option_key == 'Hindi' && hindi == "on") hindi = e.id;
            if (e.option_key == 'English' && english == "on") english = e.id;
            if (e.option_key == 'Gujarati' && gujarati == "on") gujarati = e.id;
            if (e.option_key == 'PHP' && php == "on") php = e.id;
            if (e.option_key == 'MYSQL' && mysql == "on") mysql = e.id;
            if (e.option_key == 'Laravel' && laravel == "on") laravel = e.id;
            if (e.option_key == 'Oracle' && oracle == "on") oracle = e.id;
            if (e.option_key == 'Beginer' && tech_php == "Beginer") tech_php = e.id;
            if (e.option_key == 'Mideator' && tech_php == "Mideator") tech_php = e.id;
            if (e.option_key == 'Expert' && tech_php == "Expert") tech_php = e.id;
            if (e.option_key == 'Beginer' && tech_mysql == "Beginer") tech_mysql = e.id;
            if (e.option_key == 'Mideator' && tech_mysql == "Mideator") tech_mysql = e.id;
            if (e.option_key == 'Expert' && tech_mysql == "Expert") tech_mysql = e.id;
            if (e.option_key == 'Beginer' && tech_laravel == "Beginer") tech_laravel = e.id;
            if (e.option_key == 'Mideator' && tech_laravel == "Mideator") tech_laravel = e.id;
            if (e.option_key == 'Expert' && tech_laravel == "Expert") tech_laravel = e.id;
            if (e.option_key == 'Beginer' && tech_oracle == "Beginer") tech_oracle = e.id;
            if (e.option_key == 'Mideator' && tech_oracle == "Mideator") tech_oracle = e.id;
            if (e.option_key == 'Expert' && tech_oracle == "Expert") tech_oracle = e.id;
        });


        let sql1 = `update employee_details set First_name = ?,Last_name = ?,Designation = ?,Email = ?,Phone_number = ?,Address_1 = ?,Address_2=?,City=?,State = ?,Zip_code=?,Gender = ?,Date_of_Birth = ?,Relationship = ? where Employee_id = ${req.params.id}`;
        result = await con.promise().query(sql1, [firstname, lastname, designation, email, phonenumber, address1, address2, city, state, zipcode, gender, dob, Relationshipstatus]);

        let sql2 = `update education_master set cource = ?,board = ?,passing_year =?,percentage = ? where emp_id = ${req.params.id} and id = ?  `;
        if (cource) {
            for (let i = 0; i < cource.length; i++) {
                await con.promise().query(sql2, [cource[i], board[i], passingyear[i], percentage[i], edu_type[i]]);
            }
        }

        let sql3 = `update work_experience set company_name = ?,designation = ?,from_date = ?,to_date=? where e_id = ${req.params.id} and id = ?`;
        if (companyname) {
            for (let i = 0; i < companyname.length; i++) {
                await con.promise().query(sql3, [companyname[i], work_designation[i], fromdate[i], todate[i], work_id[i]]);
            }
        }

        let sql4 = `update languages set languages = ?,r = ?, w=?,s=? where e_id =${req.params.id} and id=?`;
        if (hindi) {
            if (h_r == "on") { h_r = 1 }
            else { h_r = 0 }
            if (h_w == "on") { h_w = 1 }
            else { h_w = 0 }
            if (h_s == "on") { h_s = 1 }
            else { h_s = 0 }
            await con.promise().query(sql4, [hindi, h_r, h_w, h_s, lang_id[0]]);
        }
        if (english) {
            if (e_r == "on") { e_r = 1 }
            else { e_r = 0 }
            if (e_w == "on") { e_w = 1 }
            else { e_w = 0 }
            if (e_s == "on") { e_s = 1 }
            else { e_s = 0 }
            await con.promise().query(sql4, [english, e_r, e_w, e_s, lang_id[1]]);
        }
        if (gujarati) {
            if (g_r == "on") { g_r = 1 }
            else { g_r = 0 }
            if (g_w == "on") { g_w = 1 }
            else { g_w = 0 }
            if (g_s == "on") { g_s = 1 }
            else { g_s = 0 }
            await con.promise().query(sql4, [gujarati, g_r, g_w, g_s, lang_id[2]]);
        }

        console.log(tech_id[0]);
        let sql5 = `update technology set tech_id = ?,tech_level=? where e_id =${req.params.id} and id=?`;
        if (php) await con.promise().query(sql5, [php, tech_php, tech_id[0]]);
        if (mysql) await con.promise().query(sql5, [mysql, tech_mysql, tech_id[1]]);
        if (laravel) await con.promise().query(sql5, [laravel, tech_laravel, tech_id[2]]);
        if (oracle) await con.promise().query(sql5, [oracle, tech_oracle, tech_id[3]]);


        let sql6 = `update referance_contact set ref_name = ?,ref_number = ?,ref_relation = ? where e_id = ${req.params.id} and id =?`;
        if (ref_name) {
            for (let i = 0; i < ref_name.length; i++) {
                await con.promise().query(sql6, [ref_name[i], ref_contact[i], ref_relation[i], ref_id[i]]);
            }
        }

        let sql7 = `update preferances set prefered_location = ?,notice_period = ?,Expected_CTC = ?, Current_CTC=? ,Department = ? where e_id = ${req.params.id}`;
        await con.promise().query(sql7, [location, notice, Expactedctc, currentctc, department]);

        res.send("updated!");
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getform, submitform, employeedata, updatedata };