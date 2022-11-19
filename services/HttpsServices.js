import Axios from 'axios';

const axiosInstance = Axios.create({
    withCredentials: true,
    baseURL: "https://ftiqms-server.onrender.com"
});

export default axiosInstance;