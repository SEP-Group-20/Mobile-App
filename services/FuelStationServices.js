import axios from 'axios';

const APIEndPoint = "http://192.168.1.12:3001/api/fuelStation";

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
