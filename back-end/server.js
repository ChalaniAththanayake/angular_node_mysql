var express = require('express');
var bodyParser = require("body-parser"); // Body parser for fetch posted dat
const bcrypt = require('bcrypt');

var app = express();

app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Binding express app to port 3000
app.listen(3000);

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loginmanagement'
});
con.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  else {
    console.log('Connection established');
  }
});
app.get('/account', function (req, res) {
  con.query('SELECT * FROM account', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
    res.json(rows);
  });
});

//rest api to create a new record into mysql database
app.post('/account', function (req, res) {
  var postData = req.body;
  // postData.password= bcrypt.hashSync(req.body.password, 10);

  con.query('INSERT INTO account SET ?', postData, function (error, result) {
    if (error) throw error;
    res.send(result);
  });
});

//rest api to create a new record into mysql database
app.post('/login', function (req, res) {
  var data = req.body;
  console.log('login', data);

  con.query('SELECT * FROM account WHERE username="' + data.username + '" AND password="' + data.password + '"', function (err, result) {
    console.log('sss',result);
    let aa=[]=[];
    aa=result;
    if (aa.length != 0) {
      res.send(true);
    }
    else {
      res.send(false);
    }
  });
  // postData.password= bcrypt.hashSync(req.body.password, 10);

  // con.query('SELECT * FROM account WHERE username="'+data.username+'"',function(err,result){
  //   console.log('wwww',result);
  //   let aa=[]=[];
  //   aa=result;
  //   aa.forEach(element => {

  //     bcrypt.compare(bcrypt.hashSync(req.body.password, 10), element.password, function(err, res) {
  //       if(res) {
  //         console.log('aaaeeeee',res);
  //       } else {
  //         console.log('bbbb',res);
  //       } 
  //     });
  //   if(bcrypt.compareSync(req.body.password, element.password)) {
  //     console.log('aaaeeeee',element.password);
  //    } else {
  //     console.log('bbbb',element.password);
  //    }
  // });
  //   });
  // });
  // con.query('INSERT INTO account SET ?', postData, function (error, result) {
  //   if (error) throw error;
  //   res.send(result);
  // });
});
