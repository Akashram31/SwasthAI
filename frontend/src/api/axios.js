import axios from 'axios';

// Single Axios instance used across the whole app instead of fetch().
// Centralizing the baseURL here means components only need to call
// api.get('/auth/login') etc, and the auth token is attached
// automatically by the request interceptor below.
const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Attach the JWT token (if present) to every outgoing request.
api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default api;
