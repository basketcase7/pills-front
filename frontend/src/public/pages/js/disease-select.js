// disease-select.js
import { API2_URL } from "./http.js";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const diseaseListEl = document.getElementById("disease-list");
const addBtn = document.getElementById("add-disease-btn");
const formContainer = document.getElementById("disease-form");

// 1) Получение и отрисовка списка уже существующих у пользователя болезней
async function fetchUserFeatures() {
  if (!token) {
    alert("Вы не авторизованы");
    return;
  }

  try {
    const res = await fetch(`${API2_URL}/api/features`, {
      headers: {
        Authorization: `Bearer ${token}`,
        userId: `${userId}`,
      },
    });
    if (!res.ok) throw new Error("Не удалось загрузить данные");
    const data = await res.json(); // { features: [ ... ] }
    renderDiseases(data.features);
  } catch (err) {
    console.error("Ошибка загрузки данных:", err);
  }
}

// 2) Рендер каждого элемента в #disease-list
function renderDiseases(diseases) {
  diseaseListEl.innerHTML = "";
  diseases.forEach((disease) => {
    const el = document.createElement("div");
    el.className = "disease-item";
    el.textContent = disease; // если ваш DTO просто List<String>
    diseaseListEl.appendChild(el);
  });
}

// 3) Создание выпадающего списка и кнопки «Сохранить» при нажатии «Добавить +»
async function handleAddDiseaseClick() {
  addBtn.disabled = true; // чтобы нельзя было кликать повторно
  formContainer.innerHTML = ""; // очищаем контейнер под форму

  // Получаем все возможные «features» из /api/features/all
  let allFeatures;
  try {
    const res = await fetch(`${API2_URL}/api/features/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Не удалось получить список всех болезней");
    allFeatures = await res.json(); // массив строк, например ["Анемия", "Диабет", ...]
  } catch (err) {
    console.error(err);
    alert("Ошибка при загрузке списка болезней");
    addBtn.disabled = false;
    return;
  }

  // Строим <select> с вариантами
  const select = document.createElement("select");
  select.id = "disease-select";
  select.style.maxWidth = "200px";

  // Вставляем каждую опцию
  allFeatures.forEach((feature) => {
    const option = document.createElement("option");
    option.value = feature;
    option.textContent = feature;
    select.appendChild(option);
  });

  // Кнопка «Сохранить»
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Сохранить";
  saveBtn.style.marginLeft = "10px";
  saveBtn.type = "button";

  // Когда пользователь нажмёт «Сохранить»
  saveBtn.addEventListener("click", async () => {
    const selected = select.value;

    try {
      const response = await fetch(`${API2_URL}/api/features`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userId: `${userId}`,
        },
        body: JSON.stringify({ title: selected }), // UserFeaturesDto
      });

      if (!response.ok) {
        const errData = await response.json();
        if (errData.status === "CONFLICT") {
          alert("Эта болезнь уже добавлена.");
        } else {
          alert("Ошибка: " + errData.message);
        }
      } else {
        // Если всё ок, перерисуем список уже добавленных болезней
        await fetchUserFeatures();
      }
    } catch (err) {
      console.error("Ошибка при добавлении:", err);
      alert("Не удалось соединиться с сервером");
    }

    // В любом случае: очищаем форму и возвращаем кнопку «Добавить +»
    formContainer.innerHTML = "";
    addBtn.disabled = false;
  });

  // Вставляем <select> и «Сохранить» в разметку перед кнопкой «Добавить +»
  formContainer.appendChild(select);
  formContainer.appendChild(saveBtn);
}

// 4) Настройка обработчиков
document.addEventListener("DOMContentLoaded", async () => {
  // Сразу загрузим список уже добавленных у пользователя болезней
  await fetchUserFeatures();

  // Клик по кнопке «Добавить +» вместо prompt(...) теперь запускает построение <select>
  addBtn.addEventListener("click", handleAddDiseaseClick);
});
