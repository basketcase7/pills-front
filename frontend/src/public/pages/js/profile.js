// Проверка авторизации

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/login.html';
}

async function loadProfile() {
    try {
        const response = await fetch('http://192.168.0.107:8080/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // ... ваш существующий код ...
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Обработчик кнопки выхода
function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');

    if (!logoutButton) {
        console.error('Кнопка выхода не найдена!');
        return;
    }

    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault(); // Добавьте это
        console.log('Начало обработки выхода');

        try {
            const response = await fetch('http://192.168.0.107:8080/auth/sessions/logout', { // Убедитесь в правильности URL
                method: 'POST', // Обычно для выхода используется POST
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Ответ сервера:', response.status);

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            } else {
                alert('Ошибка выхода: ' + response.status);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Сервер недоступен');
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    setupLogoutButton();
});