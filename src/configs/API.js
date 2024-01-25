import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000/"

export const endpoints = {
    'product-categories': '/product-categories/',
    'vehicles': '/vehicles/',
    'basic-user-register': '/users/',
    'shipper-register': '/shippers/',
    'shipper-more': '/shipper-more/'
}

export default axios.create({
    baseURL: BASE_URL
})