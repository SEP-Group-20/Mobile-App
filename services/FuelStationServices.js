import axios from './HttpsServices';

const APIEndPoint = "/api/fuelStation";

const getCustomerDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getCustomerDetails",
        data: formData,
    });
};

const recordFuelSale = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/recordFuelSale",
        data: formData,
    });
}

export {
    getCustomerDetails,
    recordFuelSale
};
