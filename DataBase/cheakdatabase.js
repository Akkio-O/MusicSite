const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "databasereg" // Имя вашей базы данных
});

con.query("SELECT * FROM users", function(err, result) {
  if (err) {
    console.error("Ошибка при выполнении запроса:", err);
  } else {
    console.log(result);
    con.end(); // Закрытие соединения с базой данных
  }
});