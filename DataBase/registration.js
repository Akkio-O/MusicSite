$(document).ready(function(){
  $('.modal').modal();
  $('.datepicker').datepicker();
});

// Получение кнопки
const registrationButton = document.getElementById('registration-button');

// Обработчик события нажатия на кнопку
registrationButton.addEventListener('click', () => {
  // Получение данных из формы
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const birthdate = document.getElementById('birthdate').value;
  const region = document.getElementById('region').value;

  // Создание объекта с данными
  const data = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    birthdate: birthdate,
    region: region
  };

  // Отправка данных на сервер с помощью AJAX-запроса
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/register'); // URL-адрес обработчика регистрации
  xhr.setRequestHeader('Content-Type', 'application/json'); // Content-Type для указания типа данных

  xhr.onload = function() {
    if (xhr.status === 200) {
      document.getElementById('message').textContent = 'Регистрация прошла успешно!';
    } else {
      document.getElementById('message').textContent = 'Ошибка регистрации. Попробуйте еще раз.';
    }
  };

  xhr.send(JSON.stringify(data)); // Отправка данные на сервер в формате JSON
});