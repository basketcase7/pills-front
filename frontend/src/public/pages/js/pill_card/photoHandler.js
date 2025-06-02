export function setupPhotoHandler(imageUrl) {
    const photoContainer = document.querySelector('.pill-photo');
    photoContainer.innerHTML = ''; // очистить на случай повторного вызова

    const img = document.createElement('img');
    img.src = imageUrl || '/assets/pictures/placeholder.png';
    img.alt = 'Фото таблетки';
    img.classList.add('pill-img');

    photoContainer.appendChild(img);
}
