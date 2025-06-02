// fetchData.js
export async function fetchPillData(title) {
    const token = localStorage.getItem('token');
    const url = `http://192.168.0.107:8081/api/pills/pill/${title}`; // Исправленный URL

    const response = await fetch(url, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (!response.ok) {
        throw new Error(`Ошибка загрузки данных таблетки: ${response.status}`);
    }

    return response.json();
}