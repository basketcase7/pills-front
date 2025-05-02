// Проверка авторизации
const token = localStorage.getItem('token');
if (!token) {
    // Если нет токена, отправляем пользователя на страницу логина
    window.location.href = '/login.html';
}

// Загружаем профиль пользователя
async function loadProfile() {
    try {
        const response = await fetch('http://192.168.0.106:8080/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const profileInfo = document.getElementById('profileInfo');

        if (response.ok) {
            const data = await response.json();
            profileInfo.innerHTML = `
                <p><strong>Имя:</strong> ${data.firstName}</p>
                <p><strong>Фамилия:</strong> ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            `;
        } else if (response.status === 401) {
            profileInfo.textContent = 'Сессия истекла. Пожалуйста, войдите снова.';
            localStorage.removeItem('token');
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);
        } else {
            profileInfo.textContent = 'Ошибка загрузки профиля.';
        }
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('profileInfo').textContent = 'Ошибка соединения с сервером.';
    }
}

loadProfile();

document.getElementById('logoutButton').addEventListener('click', async () => {
    const token = localStorage.getItem('token');  // достаем токен из localStorage

    if (!token) {
        alert('Вы не авторизованы.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5173/auth/sessions/logout', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Вы успешно вышли из аккаунта.');
            localStorage.removeItem('token');  // удаляем токен
            window.location.href = '/index.html';  // переадресация на страницу входа
        } else if (response.status === 401) {
            alert('Сессия уже завершена или вы не авторизованы.');
        } else {
            alert('Ошибка при выходе.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером.');
    }
});
