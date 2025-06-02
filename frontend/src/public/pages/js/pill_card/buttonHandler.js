export function setupButtonHandlers(pillId) {
    const addButton = document.querySelector('#add-pill-btn');

    addButton?.addEventListener('click', async () => {
        const token = localStorage.getItem('authToken'); // или другой способ хранения авторизации

        // 1. Проверка авторизации
        if (!token) {
            window.location.href = '/pages/login.html'; // редирект на страницу входа
            return;
        }

        try {
            // 2. Запрос на добавление таблетки с проверкой противопоказаний
            const response = await fetch('http://localhost:3000/api/user/pills/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // отправляем токен
                },
                body: JSON.stringify({ pillId }),
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('✅ Таблетка добавлена в ваш профиль!');
            } else if (response.status === 409) {
                alert('⚠️ Таблетка содержит противопоказания и не может быть добавлена.');
            } else {
                alert('❌ Ошибка: ' + result.message);
            }
        } catch (err) {
            console.error('Ошибка при добавлении таблетки:', err);
            alert('Произошла ошибка при добавлении таблетки.');
        }
    });
}
