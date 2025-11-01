import axios from 'axios';

 export const login = (login) => {
    console.log(login);
    let baseUrl = import.meta.env.VITE_API_URL;
    baseUrl = baseUrl + "/auth/login";
     const response = axios.post(baseUrl,login);
    return response.data.message;
}