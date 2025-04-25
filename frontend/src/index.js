import { login } from './api/auth.js';

login('user@example.com', 'P@ssw0rd!')
    .then(data => console.log('Успешный вход:', data))
    .catch(err => console.error('Ошибка входа:', err));
