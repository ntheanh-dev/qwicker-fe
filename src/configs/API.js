import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000/"

export const baseEndpoints = {
    'product-categories': '/product-categories/',
    'vehicles': '/vehicles/',
    'product-categories': '/product-categories/',
    'payment-method': '/payment-method/',
    'convert-token': '/auth/convert-token'
}
export const basicUserEndpoints = {
    'basic-user-register': '/users/',
    'login': '/auth/token/',
    'current-user': 'users/current-user/',
    'my-jobs': (pagrams) => `/jobs/?${pagrams}`,
    'job-retrieve': (jobId) => `/jobs/${jobId}/`,
    'assign-job': (jobId) => `/jobs/${jobId}/assign/`,
    'send_feedback': (jobId) => `/jobs/${jobId}/feedback/`
}
export const shipperEndpoints = {
    'shipper-register': '/shippers/',
    'login': '/auth/token/',
    'current-user': 'shippers/current-user/'
}
export const jobEndpoints = {
    'jobs': '/jobs/',
    'listShipper': (jobId) => `/jobs/${jobId}/list-shipper/`

}

export const ShipperJobEndpoints = {
    'find-job': `/shipper-jobs/find/`,
    'job-retrieve': (jobId) => `/shipper-jobs/${jobId}/`,
    'join-job': (jobId) => `/shipper-jobs/${jobId}/join/`,
    'my-jobs': (pagrams) => `/shipper-jobs/my-jobs/?${pagrams}`,
    'complete': (jobId) => `/shipper-jobs/${jobId}/complete/`,
}

export const authAPI = (access_token) => axios.create({
    baseURL: BASE_URL,
    timeout: 6000,
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
})
export const urlAuthAPI = (access_token, url) => axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
})
export default axios.create({
    baseURL: BASE_URL,
    timeout: 6000,
})