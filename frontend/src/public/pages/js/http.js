const API_URL = 'http://192.168.0.106:8080'; // или адрес твоего бэка

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
