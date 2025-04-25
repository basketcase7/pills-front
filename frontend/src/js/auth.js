import { request } from './http';

export function login(email, password) {
    return request('/auth/sessions/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

// api/auth.js
export async function register(data) {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Ошибка регистрации: ${error}`);
    }

    return await response.json(); // { token: '...' }
}


export function logout(token) {
    return request('/auth/sessions/logout', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
