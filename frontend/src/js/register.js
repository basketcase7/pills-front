// register.js
import { register } from './api/auth.js';

const form = document.getElementById('registerForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    try {
        const response = await register(userData);

        // сохраняем токен (если нужно использовать позже)
        localStorage.setItem('token', response.token);

        // перенаправляем на главную страницу
        window.location.href = '/index.html';
    } catch (error) {
        result.textContent = `❌ Ошибка: ${error.message}`;
        result.style.color = 'red';
    }
});
