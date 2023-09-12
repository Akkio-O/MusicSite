let root = document.querySelector(":root");
let button = document.querySelector("#themeButton");

button.addEventListener('click', () => {
  event.preventDefault();
  root.classList.toggle('dark');
  
  switch (themeButton.textContent) {
    case "темная тема":
      themeButton.textContent = "светлая тема"
    default:
      themeButton.textContent = "темная тема"
  }
})

const themeButton = document.getElementById('themeButton');

function toggleTheme() {
themeButton.addEventListener('click', toggleTheme);
}

M.AutoInit();


// Находим блок с категориями
let categoryBlock = document.querySelector('.sidebar-left-category');

// Находим блок с картинками
let imageContainer = document.querySelector('.image-container');

// Функция для подстраивания высоты блока с категориями
function adjustCategoryHeight() {
  // Получаем высоту картинок
  let imageHeight = imageContainer.offsetHeight;
  
  // Устанавливаем высоту блока с категориями равной высоте картинок
  categoryBlock.style.minHeight = imageHeight + 'px';
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('load', adjustCategoryHeight);
window.addEventListener('resize', adjustCategoryHeight);



document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.materialboxed');
  let instances = M.Materialbox.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.slider');
  let instances = M.Slider.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  let carousel = document.querySelector('.carousel');
  let instance = M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true
  });
});

let counter = 0;
let counterElement = document.querySelector('.counter');

function increment() {
  counter++;
  counterElement.textContent = counter;
}

function decrement() {
  if (counter > 0) {
    counter--;
    counterElement.textContent = counter;
  }
};

// Объявляем пустой массив для хранения товаров в корзине
let cartItems = [] ;

// Функция для открытия модального окна корзины
function openCart() {
  let cartModal = document.querySelector('#cartModal');
  let instance = M.Modal.init(cartModal, {});
  instance.open();
}


// Обработчик события для закрытия модального окна по кнопке "Закрыть"
let closeButton = document.querySelector('.modal-close');
closeButton.addEventListener('click', function() {
  let modal = closeButton.closest('.modal');
  let instance = M.Modal.getInstance(modal);
  instance.close();
});

// Обработчик события для закрытия модального окна при клике вне окна
document.addEventListener('click', function(event) {
  let modal = document.querySelector('.modal');
  let isOutsideModal = !modal.contains(event.target);

  if (isOutsideModal && !event.target.classList.contains('modal-trigger')) {
    let instance = M.Modal.getInstance(modal);
    instance.close();
  }
});

function addToCart(button) {
  let item = button.parentNode.parentNode.cloneNode(true);
  let modal = M.Modal.getInstance(document.getElementById('cartModal'));
  let destinationBlock = document.getElementById('destinationBlock');

  // Добавление атрибута onclick для кнопки "Убрать"
  let removeButton = item.querySelector('.remove-button');
  removeButton.setAttribute('onclick', 'removeFromCart(this)');

  // Удаление стилей цвета текста
  item.style.color = '';

  destinationBlock.appendChild(item);
  
  // Обновление счетчика
  increment();
}

function removeFromCart(button) {
  let item = button.parentNode.parentNode;
  item.remove();
  
  // Отменить закрытие модального окна
  event.stopPropagation();
  
  // Обновление счетчика
  decrement();
}