document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-disease-btn');
    const diseaseList = document.createElement('div');
    diseaseList.id = 'disease-list';
    addBtn.insertAdjacentElement('beforebegin', diseaseList); // вставляем перед кнопкой

    // Функция добавления выпадающего списка
    function createDiseaseSelector(diseases) {
        const wrapper = document.createElement('div');
        wrapper.className = 'disease-selector';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Поиск болезни...';

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        diseases.forEach(disease => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.textContent = disease;
            item.addEventListener('click', () => {
                wrapper.innerHTML = '';
                const selected = document.createElement('span');
                selected.textContent = disease;
                wrapper.appendChild(selected);
                addBtn.style.display = 'inline-block'; // вернуть кнопку "Добавить +"
            });
            dropdown.appendChild(item);
        });

        input.addEventListener('input', () => {
            const filter = input.value.toLowerCase();
            dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(filter) ? 'block' : 'none';
            });
        });

        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        diseaseList.appendChild(wrapper);
    }

    // Обработчик клика по кнопке
    addBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/diseases'); // 🔁 Проверь этот эндпоинт!
            const diseases = await response.json();
            addBtn.style.display = 'none'; // скрываем кнопку
            createDiseaseSelector(diseases);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    });
});
