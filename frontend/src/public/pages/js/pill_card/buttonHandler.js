// import {API2_URL} from 'init.js';
//
// export function setupButtonHandlers(pillTitle) {
//     const addButton = document.querySelector('#add-pill-btn');
//
//     addButton?.addEventListener('click', async () => {
//         const token = localStorage.getItem('authToken'); // или другой способ хранения авторизации
//
//         // 1. Проверка авторизации
//         if (!token) {
//             window.location.href = '/pages/login.html'; // редирект на страницу входа
//             return;
//         }
//
//         try {
//             // 2. Запрос на добавление таблетки с проверкой противопоказаний
//             const response = await fetch(`${API2_URL}/api/user_pill/add`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`, // отправляем токен
//                 },
//                 body: JSON.stringify({ pillTitle }),
//             });
//
//             const result = await response.json();
//
//             if (response.status === 200) {
//                 alert('✅ Таблетка добавлена в ваш профиль!');
//             } else if (response.status === 409) {
//                 alert('⚠️ Таблетка содержит противопоказания и не может быть добавлена.');
//             } else {
//                 alert('❌ Ошибка: ' + result.message);
//             }
//         } catch (err) {
//             console.error('Ошибка при добавлении таблетки:', err);
//             alert('Произошла ошибка при добавлении таблетки.');
//         }
//     });
// }
