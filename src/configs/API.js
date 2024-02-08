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
    'current-user': 'users/current-user/',
    'my-jobs': (pagrams) => `/jobs/?${pagrams}`,
    'job-retrieve': (jobId) => `/jobs/${jobId}/`,
    'assign-job': (jobId) => `/jobs/${jobId}/assign/`
}
export const shipperEndpoints = {
    'shipper-register': '/shippers/',
    'login': '/o/token/',
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
    headers: {
        "Authorization": `Bearer ${access_token}`
    }
})
export default axios.create({
    baseURL: BASE_URL
})