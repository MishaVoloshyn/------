window.addEventListener('DOMContentLoaded', (event) => {
    // Замените 'YOUR_API_KEY' на ваш собственный API-ключ OpenWeatherMap
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
  
    // Запрашиваем город у пользователя
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Введите название города';
    document.body.appendChild(input);
  
    // Обработчик события нажатия кнопки Enter
    input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        // Получаем введенное значение
        const city = input.value;
  
        // Формируем URL для запроса к API OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
        // Отправляем GET-запрос к API
        fetch(url).then((response) => response.json()).then((data) => {
  
          // Выводим данные на страницу
          document.getElementById('city').innerHTML = city;
          document.getElementById('weather').innerHTML = `Текущая температура: ${data.main.temp}°C<br>Описание: ${data.weather[0].description}`;
          document.getElementById('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  
          // Получаем UTC-время заката
          const sunset = new Date(data.sys.sunset);
  
          // Преобразуем UTC-время в местное время
          const localSunset = sunset.toLocaleTimeString();
  
          // Выводим местное время заката на страницу
          document.getElementById('sunset').innerHTML = `Закат: ${localSunset}`;
  
          // Получаем UTC-время рассвета
          const sunrise = new Date(data.sys.sunrise);
  
          // Преобразуем UTC-время в местное время
          const localSunrise = sunrise.toLocaleTimeString();
  
          // Выводим местное время рассвета на страницу
          document.getElementById('sunrise').innerHTML = `Восход: ${localSunrise}`;
        })
            .catch((error) => {
              console.error('Произошла ошибка:', error);
            });
  
        // Удаляем элемент ввода
        input.remove();
      }
    });
  });
  