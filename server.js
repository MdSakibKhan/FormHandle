const express = require('express');

const bcrypt = require('bcrypt');
const app = express();


var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'userdb'
});
 
connection.connect();


const user = []

app.use(express.urlencoded({extended: false})) // We can access variables inside out Post Methods.

app.set('view-engine','ejs')

app.get('/', (req, res)=>{
  res.render('home.ejs')
})

app.get('/register', (req, res)=>{
  res.render('register.ejs')
})

app.post('/register', (req, res)=>{
  //we can access form values here.
  let qr = "INSERT INTO `users`(`name`, `email`) VALUES ('"+ req.body.name     +"','"+  req.body.email +"')"
  connection.query(qr, (err, result)=>{
    if (err) res.render("Not Inserted")
    else res.redirect('/register')
  })
})

app.post('/success', (req, res)=>{
  res.render('successmsg.ejs')
})

app.get('/showusers', (req, res)=>{
  connection.query('Select user_id,first_name, last_name from user',(err, result)=>{
    if(err) {
      res.write("Not Connected")
    }
    res.render('showusers.ejs', {users : result})
  });
})


app.listen(8080, ()=>{
      console.log("Connection Successful")
})
