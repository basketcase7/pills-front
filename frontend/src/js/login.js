import { login } from "@/js/auth.js";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const result = document.getElementById('result');

    // Очистить прошлые сообщения и сбросить цвет
    result.textContent = '';
    result.style.color = 'inherit';

    // ===== 🚨 Валидация данных =====
    const errors = [];

    if (!email) {
        errors.push('Email обязателен.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Неверный формат email.');
    }

    if (!password) {
        errors.push('Пароль обязателен.');
    } else if (password.length < 8) {
        errors.push('Пароль должен быть не меньше 8 символов.');
    }

    // Если есть ошибки, показываем их
    if (errors.length > 0) {
        result.innerHTML = errors.map(err => `❌ ${err}`).join('<br>');
        result.style.color = 'red';
        return;
    }

    // ===== ✅ Отправка запроса =====
    try {
        const response = await login(email, password);

        // сохраняем токен (если нужно использовать позже)
        localStorage.setItem('token', response.token);

        // перенаправляем на главную страницу
        window.location.href = '/home.html';
    } catch (error) {
        console.error('Ошибка регистрации:', error);  // <-- добавили вывод в консоль
        result.textContent = `❌ Ошибка: ${error.message}`;
        result.style.color = 'red';
    }
});
