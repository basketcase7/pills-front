import { register } from "@/js/auth.js";

const form = document.getElementById('registerForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
        firstName: formData.get('firstName').trim(),
        lastName: formData.get('lastName').trim(),
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
    };

    // Очистить прошлые сообщения
    result.textContent = '';
    result.style.color = 'red';

    // ===== Валидация данных =====
    const errors = [];
    const namePattern = /^[А-ЯЁ][а-яё]{1,50}$/;

    // Проверка имени
    if (!userData.firstName) {
        errors.push('Имя обязательно.');
    } else if (!namePattern.test(userData.firstName)) {
        errors.push('Имя должно начинаться с заглавной буквы и содержать только кириллицу.');
    }

    // Проверка фамилии
    if (!userData.lastName) {
        errors.push('Фамилия обязательна.');
    } else if (!namePattern.test(userData.lastName)) {
        errors.push('Фамилия должна начинаться с заглавной буквы и содержать только кириллицу.');
    }

    // Проверка email
    if (!userData.email) {
        errors.push('Email обязателен.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        errors.push('Неверный формат email.');
    }

    // Проверка пароля
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&\-+=()!*])(?=\S+$).{8,64}$/;
    if (!userData.password) {
        errors.push('Пароль обязателен.');
    } else if (!passwordPattern.test(userData.password)) {
        errors.push('Пароль должен содержать заглавные и строчные буквы, цифры и спецсимволы, минимум 8 символов.');
    }

    // Если есть ошибки, показать их
    if (errors.length > 0) {
        result.textContent = errors.join(' ');
        return;
    }

    // ===== Отправка данных =====
    try {
        await register(userData);
        window.location.href = '/home.html';
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        result.textContent = `❌ ${error.message}`;
        result.style.color = 'red';
    }
});