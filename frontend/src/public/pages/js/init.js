import { API2_URL } from "./http.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  console.log(
    "я зашел в скрипт, который должен отрисовывать экран таблетки и кидать запросы на бекенд"
  );

  if (!title) {
    document.getElementById("pill-title").textContent =
      "Название таблетки не указано";
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API2_URL}/api/pills/pill/${encodeURIComponent(title)}`,
      {}
    );

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных таблетки: ${response.status}`);
    }

    const pill = await response.json();

    // Название
    document.getElementById("pill-title").textContent = pill.title;

    // Описание
    document.getElementById("pill-description").textContent =
      pill.description || "Описание отсутствует";

    // Противопоказания
    const contraDiv = document.getElementById("pill-contra");
    if (Array.isArray(pill.features)) {
      contraDiv.innerHTML = pill.features.map((f) => `<li>${f}</li>`).join("");
    } else if (typeof pill.features === "object" && pill.features !== null) {
      contraDiv.innerHTML = Object.values(pill.features)
        .map((f) => `<li>${f}</li>`)
        .join("");
    } else {
      contraDiv.textContent = pill.features;
    }

    // Фото
    const photoEl = document.getElementById("pill-photo");
    if (pill.imageUrl) {
      photoEl.innerHTML = `<img src="${pill.imageUrl}" alt="${pill.title}" class="pill-img">`;
    } else {
      photoEl.innerHTML =
        '<span class="placeholder-text">Нет изображения</span>';
    }

    // Кнопка добавления
    document
      .querySelector(".add-button")
      .addEventListener("click", async () => {
        if (!token) {
          alert("Сначала войдите в профиль");
          return;
        }

        try {
          const response = await fetch(
            `${API2_URL}/api/user_pill?pillTitle=${encodeURIComponent(title)}`,
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
  } catch (err) {
    console.error(err);
    document.getElementById("pill-title").textContent =
      "Ошибка загрузки таблетки";
  }
});
