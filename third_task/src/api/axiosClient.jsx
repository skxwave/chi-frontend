import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = sessionStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:8000/auth/token/refresh/', {
                    refresh: refreshToken,
                });
                const { access } = response.data;

                sessionStorage.setItem('accessToken', access);

                originalRequest.headers.Authorization = `Bearer ${access}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refreshing error:', refreshError);
                sessionStorage.clear();
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
