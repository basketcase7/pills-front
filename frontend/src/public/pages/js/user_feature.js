// // получение противопоказаний пользователя(для личного кабинета и логики сравнения) GET

// import { API_URL } from "./http.js";
// const token = localStorage.getItem("token");

// export async function fetchUserFeatures() {
//   try {
//     const response = await fetch(`${API_URL}/api/features`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Ошибка при получении особенностей: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Ошибка запроса:", error);
//     throw error;
//   }
// }

// // использование на странице получения противопоказаний????????????
// // файл desease-select____

// // добавление особенности POST

// export async function addUserFeature(feature) {
//   try {
//     const response = await fetch(`${API_URL}/api/features`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(feature),
//     });

//     if (!response.ok) {
//       throw new Error(`Ошибка при добавлении особенности: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Ошибка запроса:", error);
//     throw error;
//   }
// }

// // использовние на старнице добавления противопоказаний

// document.getElementById("addFeatureBtn").addEventListener("click", async () => {
//   const featureKey = document.getElementById("featureSelect").value; // например, "NO_SUGAR"

//   try {
//     const updatedFeatures = await addUserFeature({ key: featureKey });
//     console.log("Обновлённые особенности:", updatedFeatures);
//     // можно обновить UI
//   } catch (error) {
//     alert("Не удалось добавить особенность");
//   }
// });
