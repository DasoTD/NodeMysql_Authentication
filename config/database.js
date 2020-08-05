const mysql = require('mysql');
require("dotenv").config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});
 db.connect(error=>{
     if(error){
         console.log(error)
     }
     else {
         console.log("MYQL DATABASE CONNECTED SUCCESSFULLY>>>>")
     }
 })
 module.exports = db;