export const API_URL = 'https://98983ac6-5c2f-4621-ad61-ffefc1a506df.mock.pstmn.io'; // или адрес твоего бэка
export async function request(url, options = {}) {
    const fullUrl = `${API_URL}${url}`;

    console.log(`➡️ Отправляем запрос на: ${fullUrl}`);  // Логирование перед отправкой

    const response = await fetch(fullUrl, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
}