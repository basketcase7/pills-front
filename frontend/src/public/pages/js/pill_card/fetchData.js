/*
// fetchData.js
// ототбражение описания и противопоказания таблетки
import {API2_URL} from 'init.js';

export async function fetchPillData(title) {
    const token = localStorage.getItem('token');
    const url = `${API2_URL}/api/pills/pill/${title}`; // Исправленный URL

    const response = await fetch(url, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    if (!response.ok) {
        throw new Error(`Ошибка загрузки данных таблетки: ${response.status}`);
    }

    return response.json();
}
*/
