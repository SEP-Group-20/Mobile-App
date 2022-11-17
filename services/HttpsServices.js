import Axios from 'axios';

const axiosInstance = Axios.create({
    withCredentials: true,
    baseURL: "http://192.168.1.12:3001"
});

export default axiosInstance;