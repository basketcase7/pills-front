const API_URL = 'http://localhost:8080'; // или адрес твоего бэка

export async function request(url, options = {}) {
    const response = await fetch(`${API_URL}${url}`, {
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
