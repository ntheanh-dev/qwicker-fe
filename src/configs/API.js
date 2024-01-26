import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000/"

export const baseEndpoints = {
    'product-categories': '/product-categories/',
    'vehicles': '/vehicles/',
}
export const basicUserEndpoints = {
    'basic-user-register': '/users/',
    'token': '/o/token/',
    'current-user': 'current-user'
}
export const shipperEndpoints = {
    'shipper-register': '/shippers/',
    'token': '/o/token/',
    'current-user': 'current-user'
}
export default axios.create({
    baseURL: BASE_URL
})