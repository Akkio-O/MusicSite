// Находим элемент, где будем выводить информацию о товарах в корзине
var cartItemsElement = document.querySelector('.cart-items');

// Получаем значение параметра 'cart' из URL
var cartParams = new URLSearchParams(window.location.search);
var encodedCart = cartParams.get('cart');

if (encodedCart) {
  // Декодируем закодированную JSON-строку
  var decodedCart = decodeURIComponent(encodedCart);

  // Преобразуем JSON-строку обратно в массив объектов
  var cartItems = JSON.parse(decodedCart);

  // Создаем HTML-разметку для каждого товара в корзине
  var cartHTML = '';
  cartItems.forEach(function(item) {
    cartHTML += `<div class="cart-item">
                   <h3>${item.name}</h3>
                   <p>Количество: ${item.count}</p>
                 </div>`;
  });

  // Вставляем HTML-разметку в элемент
  cartItemsElement.innerHTML = cartHTML;
} else {
  // Если параметр 'cart' отсутствует в URL, выводим предупреждение
  cartItemsElement.textContent = 'Корзина пуста';
}