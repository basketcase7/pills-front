import { request } from './http';

export function getProfile(token) {
    return request('/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
