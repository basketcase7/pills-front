// index.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        console.log('Пользователь авторизован. Токен:', token);
        // Здесь можно, например, отрисовать информацию о пользователе
    } else {
        console.log('Пользователь не авторизован');
    }
});
