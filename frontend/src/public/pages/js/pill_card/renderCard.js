// renderCard.js
export function renderPillCard(data) {
    // Название
    document.getElementById('pill-title').textContent = data.title || 'Нет названия';

    // Описание
    document.getElementById('pill-description').textContent = data.description || 'Нет описания';

    // Противопоказания
    const featureContainer = document.getElementById('pill-contra');
    featureContainer.innerHTML = '';

    if (Array.isArray(data.feature) && data.feature.length) {
        data.feature.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            featureContainer.appendChild(p);
        });
    } else {
        featureContainer.textContent = 'Нет противопоказаний';
    }
}