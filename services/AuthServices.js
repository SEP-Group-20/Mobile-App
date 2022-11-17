import axios from './HttpsServices';

const APIEndPoint = "/api/auth";

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