// Скрипт для загрузки и отображения страниц с таблетками, с пагинацией и заглушкой для изображений

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('pill-container');
    const pageNumbers = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const authSection = document.getElementById('auth-section');

    let currentPage = 1;
    let totalPages = 0;
    const token = localStorage.getItem('token');
    const baseUrl = 'http://192.168.0.107:8081/api/pills';
    const placeholder = '/public/assets/pictures/placeholder.png';

    // 1) Проверка авторизации и отрисовка секции
    if (authSection) {
        authSection.innerHTML = token
            ? `<a href="/pages/profile.html">
         <img src="./public/assets/pictures/sign_up_icon.png" class="ant_logo">
         <p class="header_text">Мой профиль</p>
       </a>`
            : `<a href="/pages/login.html">
         <img src="./public/assets/pictures/sign_up_icon.png" class="ant_logo">
         <p class="header_text">Войти</p>
       </a>`;
    }

    // 1.5) Добавление кнопки "Добавить таблетку"
    const addBtnContainer = document.getElementById('add-pill-button-container');
    if (addBtnContainer) {
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Добавить таблетку';
        addBtn.className = 'add-pill-button'; // для стилизации
        addBtn.addEventListener('click', () => {
            window.location.href = '/pages/pill_card.html'; // укажи нужную страницу
        });
        addBtnContainer.appendChild(addBtn);
    }

    // 2) Загрузка количества страниц и первой страницы
    loadPageCount();

    async function loadPageCount() {
        try {
            const resp = await fetch(`${baseUrl}/pageCount`, {
                headers: token ? {'Authorization': `Bearer ${token}`} : {}
            });
            totalPages = await resp.json();
            renderPagination();
            loadPage(1);
        } catch (e) {
            console.error('Ошибка загрузки количества страниц:', e);
        }
    }

    // 3) Загрузка конкретной страницы
    async function loadPage(page) {
        try {
            const resp = await fetch(`${baseUrl}/${page}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            const pills = await resp.json();
            displayPills(pills);
            currentPage = page;
            updatePaginationButtons();
            renderPagination(); // добавь это, чтобы обновить состояние кнопок
        } catch (e) {
            console.error('Ошибка загрузки страницы:', e);
        }
    }


    // 4) Функция отображения карточек таблеток
    function displayPills(pills) {
        container.innerHTML = '';
        pills.forEach(pill => {
            const imgSrc = placeholder;

            const card = document.createElement('div');
            card.className = 'pill-card';
            card.innerHTML = `
            <div class="pill-image">
                <img src="${imgSrc}" alt="Заглушка">
            </div>
            <div class="pill-title">${pill.title}</div>
        `;

            card.addEventListener('click', () => {
                // Сохраняем название в localStorage (опционально, если нужно для других целей)
                localStorage.setItem('selectedPillTitle', pill.title);

                // Переходим на страницу карточки с параметром title в URL
                window.location.href = `/pages/pill_card.html?title=${encodeURIComponent(pill.title)}`;
            });


            container.appendChild(card);
        });
    }


    // 5) Пагинация
    function renderPagination() {
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;

            // disable кнопку, если это текущая страница
            btn.disabled = (i === currentPage);

            btn.addEventListener('click', () => {
                if (i !== currentPage) {
                    loadPage(i); // загружаем страницу i
                }
            });

            pageNumbers.appendChild(btn);
        }

        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) loadPage(currentPage - 1);
        });

        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) loadPage(currentPage + 1);
        });
    }



    function updatePaginationButtons() {
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    }
});
