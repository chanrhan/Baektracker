import axios from "axios";

export const CONTEXT_PATH = window.location.origin;

const axiosInstance = axios.create({
    baseURL: CONTEXT_PATH,
    timeout: 10000,
    headers: {
        "Content-Type": `application/json`,
        "Accept": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        'Access-Control-Allow-Credentials': "true",
    },
    withCredentials: true,
});


export default axiosInstance;
