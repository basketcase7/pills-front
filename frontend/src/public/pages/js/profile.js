import { API2_URL } from "./http.js";
import { API_URL } from "./http.js";

const token = localStorage.getItem("token");
const personalUserId = localStorage.getItem("userId");

if (!token) {
  window.location.href = "login.html";
}

function setupLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");

  if (!logoutButton) {
    console.error("Кнопка выхода не найдена!");
    return;
  }

  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Начало обработки выхода");

    try {
      const response = await fetch(`${API_URL}/auth/sessions/logout`, {
        method: "PATCH", // Или 'POST', если бек ожидает
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Ответ сервера:", response.status);

      if (response.ok) {
        // Удаляем токен
        localStorage.removeItem("token");
        // Переход на страницу логина
        window.location.href = "login.html";
      } else {
        alert("Ошибка выхода: " + response.status);
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      alert("Сервер недоступен");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  setupLogoutButton(token);
});
//_____________________________________________________-
console.log("Получаем таблетки пользователя с бэкенда");
async function getUserPills() {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      console.error("No token found");
      return [];
    }

    const response = await fetch(`${API2_URL}/api/user_pill`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        userId: `${userId}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error: ${response.status}, ${errorText}`);
    }

    const data = await response.json();
    console.log("Received pills:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch pills:", error);
    return [];
  }
}

function renderPillButtons(pills) {
  const container = document.getElementById("medButtonsContainer");
  container.innerHTML = ""; // очищаем всё

  if (!pills || pills.length === 0) {
    const message = document.createElement("div");
    message.textContent = "У вас пока еще не добавлено ни одной таблетки";
    message.style.cursor = "pointer";
    message.style.color = "#007BFF";
    message.style.padding = "10px";
    message.style.fontWeight = "bold";

    message.addEventListener("click", () => {
      window.location.href = "/index.html"; // или "/" — зависит от структуры проекта
    });

    container.appendChild(message);
    return;
  }

  pills.forEach((pill) => {
    const button = document.createElement("button");
    button.textContent = pill.title || "Без названия";

    button.addEventListener("click", () => {
      window.location.href = `/pages/pill.html?title=${encodeURIComponent(
        pill.title
      )}`;
    });

    container.appendChild(button);
  });
}

async function init() {
  const pills = await getUserPills();
  renderPillButtons(pills);
}

document.addEventListener("DOMContentLoaded", init);
// Выпадаюший список с противопоказаниями пользователя
//  Получить список “особенностей” пользователя (например, болезни, аллергии)
const res = await fetch(`${API2_URL}/api/features/all`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const userFeatures = await res.json();
//________________________________________________________________________
const userId = localStorage.getItem("userId");

async function fetchAndRenderUserDiseases() {
  const res = await fetch(`${API2_URL}/api/features`, {
    headers: {
      Authorization: `Bearer ${token}`,
      userId: userId,
    },
  });

  const { features } = await res.json();
  const listContainer = document.getElementById("disease-list");
  listContainer.innerHTML = "";

  features.forEach((feature) => {
    const item = document.createElement("div");
    item.textContent = feature;
    listContainer.appendChild(item);
  });
}

async function handleAddDiseaseClick() {
  const addBtn = document.getElementById("add-disease-btn");
  console.log("кнопка сохранть");
  if (addBtn) {
    addBtn.style.display = "none";
  } else {
    console.log("Кнопка не найдена!");
  }

  const formContainer = document.getElementById("disease-form");
  formContainer.innerHTML = ""; // очистка от старого select'а, если вдруг

  const res = await fetch(`${API2_URL}/api/features/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const allFeatures = await res.json();

  const select = document.createElement("select");
  select.id = "disease-select";
  select.style.Width = "200px";
  select.style.padding = "8px";
  select.style.border = "1px solid #ccc";
  select.style.borderRadius = "4px";
  select.style.fontSize = "14px";
  select.style.backgroundColor = "#fff";
  select.style.color = "#333";
  select.style.marginTop = "10px";
  console.log("выпадающий список");

  allFeatures.forEach((feature) => {
    const option = document.createElement("option");
    option.value = feature;
    option.textContent = feature;
    select.appendChild(option);
  });

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Сохранить";
  saveBtn.style.marginLeft = "10px";

  saveBtn.addEventListener("click", async () => {
    const selected = select.value;

    try {
      const response = await fetch(`${API2_URL}/api/features`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userId: `${personalUserId}`,
        },
        body: JSON.stringify({ title: selected }),
      });

      if (response.ok) {
        await fetchAndRenderUserDiseases();
      } else {
        const error = await response.json();
        if (error.status === "CONFLICT") {
          alert("Такая болезнь уже добавлена");
        } else {
          alert("Ошибка: " + error.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка соединения");
    }

    // Удаляем форму и возвращаем кнопку
    formContainer.innerHTML = "";
    addBtn.style.display = "block";
  });

  formContainer.appendChild(select);
  formContainer.appendChild(saveBtn);
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  setupLogoutButton();

  await fetchAndRenderUserDiseases();
  await init(); // загрузка таблеток

  const addDiseaseBtn = document.getElementById("add-disease-btn");
  if (addDiseaseBtn) {
    addDiseaseBtn.addEventListener("click", handleAddDiseaseClick);
  }
});

async function loadUserFullName() {
  try {
    console.log("Загрузка имени пользователя...");
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Ошибка при получении пользователя:", response.status);
      return;
    }

    const user = await response.json();
    const fullNameElement = document.getElementById("fullname");

    if (fullNameElement && user.firstName && user.lastName) {
      fullNameElement.textContent = `${user.firstName} ${user.lastName}`;
    } else {
      fullNameElement.textContent = "Имя не указано";
    }
  } catch (error) {
    console.error("Ошибка при получении имени:", error);
  }
}

loadUserFullName();
