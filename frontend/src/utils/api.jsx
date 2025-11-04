import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('r_token');
            if(refreshToken){
                try{
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                        refresh_token : refreshToken
                    });

                    const newToken = res.data.access_token;
                    localStorage.setItem('token', newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest)
                }
                catch(error){
                    console.error("Refresh token failed:", err);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                }
            }
            else{
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;