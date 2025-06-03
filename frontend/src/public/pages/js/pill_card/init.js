// import { fetchPillData } from './fetchData.js';
// import { renderPillCard } from './renderCard.js';
// import { setupButtonHandlers } from './buttonHandler.js'; // 👈 импортируешь обработчик
//
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const title = localStorage.getItem('selectedPillTitle');
//
//         if (!title) {
//             console.error('Не передано название таблетки');
//             return;
//         }
//
//         // 👇 Логирование + setup кнопки
//         console.log('Выбранная таблетка:', title);
//         setupButtonHandlers(title); // ✅ Вызов обработчика кнопки с нужным названием
//
//         const pillData = await fetchPillData(title);
//         renderPillCard(pillData);
//     } catch (error) {
//         console.error('Ошибка при инициализации страницы:', error);
//     }
// });
