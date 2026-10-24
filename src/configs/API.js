import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { resolveBackendConfig } from "./backend.mjs";

export { getApiError } from "./backend.mjs";
const backend = resolveBackendConfig({
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  socketUrl: process.env.EXPO_PUBLIC_WEBSOCKET_URL,
  hostUri: Constants.expoConfig?.hostUri,
  platform: Platform.OS,
  port: process.env.EXPO_PUBLIC_API_PORT || "8888",
});
export const BASE_URL = backend.apiUrl;
export const webSocketUrl = backend.socketUrl;
export const baseEndpoints = {
  "product-categories": "/post/product-category",
  vehicles: "/post/vehicles",
  "payment-method": "/api/payment/methods",
  "my-coupon": "/api/coupon/my-coupon/",
};
export const accountEndpoints = {
  "change-password": "/api/account/change-password/",
  login: "/identity/auth/token",
  "convert-token": "/api/auth/convert-token/",
  "sent-otp": "sent-otp",
  "verify-register-otp": "verify-register-otp",
  "reset-password": "/api/account/reset-password/",
  "check-account": "/api/users/check-account",
  "register-user": "/api/users",
  "register-shipper": "/api/shippers",
};
export const basicUserEndpoints = {
  "basic-user-register": "/api/users/",
  "my-info": "/profile/users/my-profile",
  "my-jobs": (params) => `/api/jobs/?${params}`,
  "job-retrieve": (jobId) => `/api/jobs/${jobId}/`,
  "assign-job": (jobId) => `/api/jobs/${jobId}/assign/`,
  send_feedback: (jobId) => `/api/jobs/${jobId}/feedback/`,
  view_feedbacks: (shipperId) => `/api/feedbacks/?shipper=${shipperId}`,
  my_feedback: (jobId) => `/api/feedbacks/my-feedback/?orderId=${jobId}`,
};
export const shipperEndpoints = {
  "shipper-register": "/api/shippers/",
  "my-info": "/profile/shippers/my-profile",
  duration: (params) => `/api/location/duration?${params}`,
};
export const jobEndpoints = {
  jobs: "/api/jobs/",
  listShipper: (jobId) => `/api/jobs/${jobId}/list-shipper/`,
};

export const ENDPOINTS = {
  statistic: "/api/statistic",
  "current-shipper-location": (shipperId) =>
    `/api/shippers/${shipperId}/current-location`,
  "collect-cash": (postId) => `/payment/payments/posts/${postId}/collect-cash`,
  "shipper-post": (params) => `/api/shippers/my-post?${params}`,
};

export const POST_ENDPOINTS = {
  "create-post": "/post/posts",
  posts: (params) => `/post/posts?${params}`,
  "get-post-by-id": (id) => `/post/posts/${id}`,
  "update-post-by-id": (id) => `/post/posts/${id}/update`,
  "get-num-shipper-joined": (id) => `/post/posts/${id}/num-shipper-joined`,
  "sent-feedback": (id) => `/post/posts/${id}/rating`,
  "get-feedback": (id) => `/post/posts/${id}/rating`,
  "get-winner": (id) => `/post/posts/${id}/winner`,
  "create-vnpay-url": (params) => `/payment/payments/vn-pay${params}`,
};

export const ShipperJobEndpoints = {
  "find-job": `/api/shipper-jobs/find/?page=1`,
  "job-retrieve": (jobId) => `/api/shipper-jobs/${jobId}/`,
  "join-job": (jobId) => `/api/shipper-jobs/${jobId}/join/`,
  "my-jobs": (pagrams) => `/api/shipper-jobs/my-jobs/?${pagrams}`,
};

export const authAPI = (access_token) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
export const urlAuthAPI = (access_token, url) =>
  axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

export const virtualearthLocation = (query) =>
  axios.create({
    baseURL: `https://dev.virtualearth.net/REST/v1/Locations?query=${query}&key=AiG0p7k1VuqiubVqZ22aZXS6HEih9Yg95wRzucCj_gRvT0HeaMMuanyX13L4qGfd`,
  });

export const virtualearthAutoSuggest = (query) =>
  axios.create({
    baseURL: `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=AiG0p7k1VuqiubVqZ22aZXS6HEih9Yg95wRzucCj_gRvT0HeaMMuanyX13L4qGfd`,
  });

export const virtualearthDriving = (lat1, long1, lat2, long2) =>
  axios.create({
    baseURL: `https://dev.virtualearth.net/REST/v1/Routes/Driving?o=json&wp.0=${lat1},${long1}&wp.1=${lat2},${long2}&key=AiG0p7k1VuqiubVqZ22aZXS6HEih9Yg95wRzucCj_gRvT0HeaMMuanyX13L4qGfd`,
  });

export default axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});
