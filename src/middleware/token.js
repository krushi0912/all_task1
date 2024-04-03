const con = require("../config/connect");

const isvaliduser = async (req,res,next)=>{
    let {token} = req.cookies;
    if(!token) return res.render("login_form");
    else next();
}

module.exports = isvaliduser;