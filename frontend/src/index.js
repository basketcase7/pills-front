document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Тестовые данные (замените на запрос к бэкенду)
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

        // Пример запроса к бэкенду (раскомментируйте, когда подключите API)
        /*
        const response = await fetch('/api/pills');
        const data = await response.json();
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        */

        const container = document.getElementById('pill-container');
        if (!container) {
            console.error('Контейнер pill-container не найден');
            return;
        }

        // Заполняем карточки данными
        data.forEach((pill, index) => {
            const card = document.createElement('div');
            card.className = 'pill-card';
            card.innerHTML = `
                <div class="pill-image">
                    <img src="${pill.imageUrl}" alt="${pill.name}" />
                </div>
                <div class="pill-name">${pill.name}</div>
                <button class="add-button" data-index="${index}">Добавить в список</button>
            `;
            container.appendChild(card);
        });

        // Инициализируем счетчики (по умолчанию 0)
        const counters = JSON.parse(localStorage.getItem('pillCounters')) || Array(data.length).fill(0);

        // Обновляем счетчики для уже существующих кнопок
        const buttons = document.querySelectorAll('.add-button');
        console.log('Найдено кнопок:', buttons.length); // Должно быть 8
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                counters[index]++;
                localStorage.setItem('pillCounters', JSON.stringify(counters));
                console.log(`Товар "${data[index].name}" добавлен, счетчик: ${counters[index]}`);
                // Здесь запрос к бэкенду для сохранения
                // fetch('/api/addPill', { method: 'POST', body: JSON.stringify({ name: data[index].name, count: counters[index] }) });
            });
        });

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }

    let currentPage = 0;
    let totalPages = 0;

    document.addEventListener('DOMContentLoaded', () => {
        loadProfile();
        setupLogoutButton();
        loadPageCount();
    });

    async function loadPageCount() {
        try {
            const response = await fetch(`http://192.168.0.106:8080/api/pills/pageCount`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            totalPages = await response.json();
            renderPagination();
            loadPage(currentPage);
        } catch (e) {
            console.error('Ошибка загрузки количества страниц:', e);
        }
    }

    async function loadPage(pageNumber) {
        try {
            const response = await fetch(`http://192.168.0.106:8080/api/pills/${pageNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const pills = await response.json();
            displayPills(pills);
            currentPage = pageNumber;
            updatePaginationButtons();
        } catch (e) {
            console.error('Ошибка загрузки страницы:', e);
        }
    }

    function displayPills(pills) {
        const container = document.getElementById('pill-container');
        container.innerHTML = '';
        pills.forEach(pill => {
            const div = document.createElement('div');
            div.className = 'pill-card'; // добавь стиль в CSS, если хочешь
            div.textContent = `${pill.name} — ${pill.description}`;
            container.appendChild(div);
        });
    }

    function renderPagination() {
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i + 1;
            btn.disabled = (i === currentPage);
            btn.addEventListener('click', () => loadPage(i));
            pageNumbers.appendChild(btn);
        }

        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 0) loadPage(currentPage - 1);
        });

        document.getElementById('next-page').addEventListener('click', () => {
            if (currentPage < totalPages - 1) loadPage(currentPage + 1);
        });
    }

    function updatePaginationButtons() {
        document.getElementById('prev-page').disabled = (currentPage === 0);
        document.getElementById('next-page').disabled = (currentPage === totalPages - 1);
        renderPagination();
    }

});