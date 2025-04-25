import { request } from './http';

export function getSessionsByStatus(active, token) {
    return request(`/auth/sessions/isactive/${active}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
