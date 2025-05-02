import { request } from './http.js';

export async function login(email, password) {
    const response = await fetch('/auth/sessions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        let errorMessage = `Ошибка: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            const text = await response.text();
            errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    saveAuthData(data);
    return data;
}

export async function register(userData) {
    try {
        const data = await request('/auth/sessions/register', {
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