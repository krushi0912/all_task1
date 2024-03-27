var mysql = require("mysql2");

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Krushi@123",
    database : "all_task"
});

con.connect(function(err){
    if(err) console.log(err);
    console.log("connected!");
})

module.exports = con;
