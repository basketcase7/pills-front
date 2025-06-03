import { API_URL } from './http.js'

const token = localStorage.getItem('token');
console.log('Я хотя бы зашёл в profile.js');

if (!token) {
    window.location.href = '/login.html';
}

function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');

    if (!logoutButton) {
        console.error('Кнопка выхода не найдена!');
        return;
    }

    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Начало обработки выхода');

        try {
            const response = await fetch(`${API_URL}/auth/sessions/logout`, {
                method: 'PATCH', // Или 'POST', если бек ожидает
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Ответ сервера:', response.status);


            if (response.ok) {

                window.location.href = '/login.html';
            } else {
                alert('Ошибка выхода: ' + response.status);
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert('Сервер недоступен');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!token) {
        window.location.href = '/login.html';
        return;
    }
    loadProfile(token);
    setupLogoutButton(token);
});

