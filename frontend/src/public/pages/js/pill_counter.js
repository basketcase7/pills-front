document.addEventListener("DOMContentLoaded", () => {
    try {
        const container = document.querySelector('.user-list-container');
        if (!container) {
            console.error('Контейнер user-list-container не найден');
            return;
        }

        // Получаем счетчики из localStorage
        const counters = JSON.parse(localStorage.getItem('pillCounters')) || [];

        // Тестовые данные (замените на данные из бэкенда)
        const data = [
            { name: 'Парацетамол', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Ибупрофен', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Аспирин', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Нурофен', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Цитрамон', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Анальгин', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Кеторол', imageUrl: 'https://via.placeholder.com/150' },
            { name: 'Диклофенак', imageUrl: 'https://via.placeholder.com/150' }
        ];

        // Пример запроса к бэкенду
        /*
        const response = await fetch('/api/userPills');
        const data = await response.json();
        */

        // Отображаем только препараты с ненулевым счетчиком
        data.forEach((pill, index) => {
            if (counters[index] > 0) {
                const pillItem = document.createElement('div');
                pillItem.className = 'pill-item';
                pillItem.innerHTML = `
                    <div class="pill-image">
                        <img src="${pill.imageUrl}" alt="${pill.name}" />
                    </div>
                    <div class="pill-name">${pill.name}</div>
                    <div class="click-count">Добавлено: ${counters[index]} раз</div>
                `;
                container.appendChild(pillItem);
            }
        });

    } catch (error) {
        console.error('Ошибка отображения списка:', error);
    }
});