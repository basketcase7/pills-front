// init.js
import { fetchPillData } from './fetchData.js';
import { renderPillCard } from './renderCard.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const title = localStorage.getItem('selectedPillTitle');
        fetch(`http://your-backend/api/pills/pill/${title}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Ошибка:', error));
        if (!title) {
            console.error('Не передано название таблетки');
            return;
        }

        const pillData = await fetchPillData(title);
        renderPillCard(pillData);
    } catch (error) {
        console.error('Ошибка при инициализации страницы:', error);
    }
});