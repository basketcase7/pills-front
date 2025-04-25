// Определяем маршруты
const routes = {
    '/': '/pages/home.html',
    '/login': '/pages/login.html',
    '/register': '/pages/register.html',
    '/profile': '/pages/profile.html'
};

// Функция загрузки контента
async function loadPage(path) {
    const response = await fetch(routes[path]);
    const html = await response.text();
    document.getElementById('app').innerHTML = html;
}

// Обработка кликов по ссылкам
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        window.history.pushState(null, null, href); // Меняем URL без перезагрузки
        loadPage(href); // Загружаем контент
    }
});

// Обработка кнопки "Назад" в браузере
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});

// Загружаем страницу при старте
loadPage(window.location.pathname || '/');