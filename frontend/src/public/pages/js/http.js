export const API_URL = "http://localhost:8080"; // сервис пользователя
export const API2_URL = "http://localhost:8081";

export async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Ошибка запроса");
  }
  return response.json();
}
