const express = require('express')
const mysql = require('mysql');
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "angulardb"
})
// app.use((req,res)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods','GET ,POST,OPTIONS,DELETE,PUT');
//     res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
// })

db.connect((err) => {
    console.log(err);
    console.log('Connect');
})

app.post('/api/postData', (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    db.query("INSERT INTO users (name , email , password) values (?,?,?)", [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
        }
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET ,POST,OPTIONS,DELETE,PUT');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
        res.status(200).json({
            message: 'User Registered!'
        })
    })
})
app.listen(5000, () => {
    console.log("Server is running");
})