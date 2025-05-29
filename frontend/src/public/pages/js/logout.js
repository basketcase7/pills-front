function logout() {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/index.html';
            } else {
                alert('Ошибка при выходе из профиля');
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе выхода:', error);
            alert('Ошибка сети');
        });
}
