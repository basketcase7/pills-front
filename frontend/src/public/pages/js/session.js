import { request } from './http.js';

export function getSessionsByStatus(active, token) {
    return request(`/auth/sessions/isactive/${active}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
