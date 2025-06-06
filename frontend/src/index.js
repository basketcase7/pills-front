import { API_URL } from "@/public/pages/js/http.js";
import { API2_URL } from "@/public/pages/js/http.js";

// Скрипт для загрузки и отображения страниц с таблетками, с пагинацией и заглушкой для изображений
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pill-container");
  const pageNumbers = document.getElementById("page-numbers");
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");
  const authSection = document.getElementById("auth-section");

  let currentPage = 1;
  let totalPages = 0;
  const token = localStorage.getItem("token");

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

  // 2) Загрузка количества страниц и первой страницы
  loadPageCount();

  async function loadPageCount() {
    try {
      const resp = await fetch(`${API2_URL}/api/pills/pageCount`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      totalPages = await resp.json();
      renderPagination();
      loadPage(1);
    } catch (e) {
      console.error("Ошибка загрузки количества страниц:", e);
    }
  }

  // 3) Загрузка конкретной страницы
  async function loadPage(page) {
    try {
      const resp = await fetch(`${API2_URL}/api/pills/${page}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const pills = await resp.json();
      displayPills(pills);
      currentPage = page;
      updatePaginationButtons();
      renderPagination(); // добавь это, чтобы обновить состояние кнопок
    } catch (e) {
      console.error("Ошибка загрузки страницы:", e);
    }
  }

  // карточки таблеток
  function displayPills(pills) {
    const container = document.getElementById("pill-container");
    container.innerHTML = "";

    pills.forEach((pill) => {
      const card = document.createElement("div");
      card.className = "pill-card";
      card.dataset.title = pill.title;

      card.innerHTML = `
            <div class="pill-image clickable">
                <img src="${pill.imageUrl}" alt="${pill.title}">
            </div>
            <div class="pill-name clickable">${pill.title}</div>
        `;

      // Переход на страницу таблетки
      card.querySelector(".pill-image").addEventListener("click", () => {
        window.location.href = `/pages/pill.html?title=${encodeURIComponent(
          pill.title
        )}`;
      });

      card.querySelector(".pill-name").addEventListener("click", () => {
        window.location.href = `/pages/pill.html?title=${encodeURIComponent(
          pill.title
        )}`;
      });

      // Кнопка добавления в кабинет
      const addButton = document.createElement("button");
      addButton.textContent = "Добавить в кабинет";
      addButton.className = "add-pill-button";

      addButton.addEventListener("click", async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Сначала войдите в профиль");
          return;
        }

        try {
          const response = await fetch(
            `${API2_URL}/api/user_pill?pillTitle=${encodeURIComponent(
              pill.title
            )}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            addButton.textContent = "Добавлено";
            addButton.disabled = true;
          } else {
            const errorData = await response.json();
            if (errorData.status === "CONFLICT") {
              alert("Вам противопоказана эта таблетка");
            } else {
              alert("Ошибка добавления таблетки: " + errorData.message);
            }
          }
        } catch (err) {
          console.error("Ошибка:", err);
          alert("Ошибка соединения с сервером");
        }
      });

      card.appendChild(addButton);
      container.appendChild(card);
    });
  }

  // 5) Пагинация
  function renderPagination() {
    pageNumbers.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;

      // disable кнопку, если это текущая страница
      btn.disabled = i === currentPage;

      btn.addEventListener("click", () => {
        if (i !== currentPage) {
          loadPage(i); // загружаем страницу i
        }
      });

      pageNumbers.appendChild(btn);
    }

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) loadPage(currentPage - 1);
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) loadPage(currentPage + 1);
    });
  }

  function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
});
