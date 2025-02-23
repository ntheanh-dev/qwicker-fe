import axios from "axios";
const IP = "172.20.10.5";
export const BASE_URL = `http://${IP}:8888/api/v3/`;
export const webSocketUrl = `http://${IP}:8088/websocket/ws`;
export const END_POINTS = {
  "check-username-exists": "identity/accounts/check-username-exists",
  "check-email-exists": "identity/accounts/check-email-exists",
  "registration-sent-otp": "identity/accounts/registration/sent-opt",
  "registration-verify-otp": "identity/accounts/registration/verify-opt",
  "register-user": "identity/accounts/registration",
  "find-all-vehicel": "post/vehicles",
  "find-all-product-category": "post/product-category",
  "create-post": "post/posts",
  "change-status": "identity/accounts/change-status",
  "update-post-status": (id) => `post/posts/${id}/update`,
  "find-post-by-id": (id) => `post/posts/${id}`,
  "find-post-by-status-list": (params) => `post/posts?${params}`,
  "find-user-profile": (type) => `profile/users/my-profile?type=${type}`,
  "find-shipper-profile": "profile/shippers/my-profile",
  token: "/identity/auth/token",
  "shipment-accept": (id) => `post/posts/${id}/shipment-accept`,
  "shipper-location": (id) => `location/shipper-location/${id}`,
  getRatingsByShipperId: (id) => `post/ratings/shipper/${id}`,
  "get-accepted-shipper": (id) => `post/posts/${id}/shippers?status=ACCEPTED`,
  "collect-cash": (id) => `payment/posts/${id}/collect-cash`,
};

export const authAPIv3 = (access_token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

export const virtualearthLocationv3 = (query) =>
  axios.create({
    baseURL: `https://dev.virtualearth.net/REST/v1/Locations?query=${query}&key=AiG0p7k1VuqiubVqZ22aZXS6HEih9Yg95wRzucCj_gRvT0HeaMMuanyX13L4qGfd`,
  });

export const virtualearthAutoSuggestv3 = (query) =>
  axios.create({
    baseURL: `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&key=AiG0p7k1VuqiubVqZ22aZXS6HEih9Yg95wRzucCj_gRvT0HeaMMuanyX13L4qGfd`,
  });

export const googMapDistanceMatrix = (origin, destination) =>
  axios.create({
    baseURL: `https://rsapi.goong.io/DistanceMatrix?origins=${origin}&destinations=${destination}&vehicle=car&api_key=mSU8H8q4TEUcZmaniecYM0Tm4RLQuKOqAC8kzhGr`,
  });

export const googMapDirection = (origin, destination) =>
  axios.create({
    baseURL: `https://rsapi.goong.io/Direction?origin=${origin}&destination=${destination}&vehicle=car&api_key=mSU8H8q4TEUcZmaniecYM0Tm4RLQuKOqAC8kzhGr`,
  });

export const googMapAutocomplete = (input) =>
  axios.create({
    baseURL: `https://rsapi.goong.io/Place/AutoComplete?api_key=mSU8H8q4TEUcZmaniecYM0Tm4RLQuKOqAC8kzhGr&input=${input}`,
  });

export const googMapGetDetailPlaceById = (id) =>
  axios.create({
    baseURL: `https://rsapi.goong.io/Place/Detail?place_id=${id}&api_key=mSU8H8q4TEUcZmaniecYM0Tm4RLQuKOqAC8kzhGr`,
  });

export const googMapReverseGeocoding = (latlng) =>
  axios.create({
    baseURL: `https://rsapi.goong.io/Geocode?latlng=${latlng}&api_key=mSU8H8q4TEUcZmaniecYM0Tm4RLQuKOqAC8kzhGr`,
  });

export default axios.create({
  baseURL: BASE_URL,
});
