export const API_URL = 'http://192.168.0.100:8080'; // или адрес твоего бэка
export async function request(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Ошибка запроса');
    }
    return response.json();
}
