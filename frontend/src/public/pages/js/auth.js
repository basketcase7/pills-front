import { request } from './http.js';
import { API_URL } from './http.js'

export async function login(email, password) {
    try {
        console.log('Отправка запроса на:', API_URL);

        const response = await fetch(`${API_URL}/auth/sessions/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email.trim(),
                password: password.trim()
            })
        });

        console.log('Получен ответ:', response);

        const responseText = await response.text();
        console.log('Текст ответа:', responseText);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        const data = JSON.parse(responseText);
        saveAuthData(data);
        return data;

    } catch (error) {
        console.error('Полная ошибка:', error);
        throw new Error('Не удалось подключиться к серверу. Проверьте консоль.');
    }
}

export async function register(userData) {
    try {
        const data = await request('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        saveAuthData(data);
        return data;
    } catch (error) {
        // Обработка ошибок уже будет в функции request
        throw error;
    }
}

function saveAuthData(data) {
    const { id, userId, token, expirationTime } = data;
    localStorage.setItem('id', id);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('tokenExpiration', expirationTime);
    console.log('Данные авторизации сохранены');
}