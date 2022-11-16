import axios from 'axios';

const APIEndPoint = "http://192.168.1.102:3001/api/auth";

const FSSLogin = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/FSSLogin",
        data: formData,
    });
};

export {
    FSSLogin
};