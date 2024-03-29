const con = require("../config/connect");

const isvaliduser = async (req,res,next)=>{
    let {token} = req.cookies;
    if(!token) return res.send(`<h1>Page not found!!<h1>`);
    else next();
}

module.exports = isvaliduser;