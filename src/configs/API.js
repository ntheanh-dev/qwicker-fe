import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000/"

export const baseEndpoints = {
    'product-categories': '/product-categories/',
    'vehicles': '/vehicles/',
    'product-categories': '/product-categories/',
    'payment-method': '/payment-method/'
}
export const basicUserEndpoints = {
    'basic-user-register': '/users/',
    'login': '/o/token/',
    'current-user': 'users/current-user/'
}
export const shipperEndpoints = {
    'shipper-register': '/shippers/',
    'login': '/o/token/',
    'current-user': 'shippers/current-user/'
}
export const authAPI = (access_token) => axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
})
export default axios.create({
    baseURL: BASE_URL
})