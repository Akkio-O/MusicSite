var mysql = require('mysql2');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var moment = require('moment');

var app = express();

app.use(bodyParser.json());
app.use(cors()); // Добавляем middleware для обработки CORS

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "databasereg"
});

// Создание таблицы users
con.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), password VARCHAR(255), birthdate DATE, region VARCHAR(255))", function(err, result) {
  if (err) {
    console.error("Ошибка при создании таблицы:", err);
  } else {
    console.log("Таблица users создана");
  }
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Middleware для обработки CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Обработчик маршрута для регистрации
app.post('/register', function(req, res) {
  // Получение данных из запроса
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var birthdate = moment(req.body.birthdate, 'MMM DD, YYYY').format('YYYY-MM-DD');
  var region = req.body.region;

  // Создание SQL-запроса INSERT
  var sql = "INSERT INTO users (first_name, last_name, phone, email, password, birthdate, region) VALUES (?, ?, ?, ?, ?, ?, ?)";
  var values = [firstName, lastName, phone, email, password, birthdate, region];

  // Выполнение запроса INSERT
  con.query(sql, values, function(err, result) {
    if (err) {
      console.error("Ошибка при выполнении запроса:", err);
      res.status(500).send('Произошла ошибка при обработке запроса');
    } else {
      console.log("User registered");
      res.status(200).send('Регистрация прошла успешно');
    }
  });
});

app.use(express.static(__dirname));

app.listen(3000, function() {
  console.log('Сервер запущен на порту 3000');
});