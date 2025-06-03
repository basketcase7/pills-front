import { request } from './http.js';
import { API_URL } from './http.js'

export async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/sessions/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: email.trim(), password: password.trim() })
        });

        if (!response.ok) {
            const responseText = await response.text();
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        const data = await response.json();
        saveAuthData(data);
        return data;

    } catch (error) {
        console.error('Ошибка логина:', error);
        throw new Error('Не удалось подключиться к серверу. Проверьте консоль.');
    }
}


export async function register(userData) {
    try {
        const data = await request(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        // НЕ сохраняем данные при регистрации
        // saveAuthData(data);  <-- удалить или закомментировать

        return data;
    } catch (error) {
        throw error;
    }
}

function saveAuthData(data) {
    const { id, userId, token, expirationTime } = data;
    localStorage.setItem('id', id);
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    console.log('Данные авторизации сохранены');
}
