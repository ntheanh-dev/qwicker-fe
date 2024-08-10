import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API, {
  accountEndpoints,
  authAPI,
  baseEndpoints,
  basicUserEndpoints,
  jobEndpoints,
  paymentEndpoints,
} from "../configs/API";
import { objectToFormData } from "../features/ultils";

const INIT_STATE = {
  user: {},
  status: "idle",
  token: { access_token: "", refresh_token: "" },
};

const basicUserSlice = createSlice({
  name: "basicUserSlice",
  initialState: INIT_STATE,
  reducers: {
    resetBasicUserSlice: (state, action) => {
      Object.assign(state, INIT_STATE);
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token.access_token = action.payload.token.accessToken;
          state.token.refresh_token = action.payload.token.refreshToken;
        }
        state.status = "idle";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(updateProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const register = createAsyncThunk(
  "user,registerUser",
  async (form, { rejectWithValue }) => {
    const formData = objectToFormData(form);
    try {
      let user = await API.post(accountEndpoints["register-user"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const token = await API.post(accountEndpoints["login"], {
        username: form.username,
        password: form.password,
      });

      return {
        user: user?.data?.result,
        token: token?.data?.result,
      };
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user,loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const token = await API.post(
        accountEndpoints["login"],
        {
          username: data?.username,
          password: data?.password,
          grant_type: "password",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let user = await authAPI(token?.data?.access_token).get(
        basicUserEndpoints["current-user"]
      );
      return {
        user: user?.data,
        token: token?.data,
      };
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "user,loginUser",
  async (access_token, { rejectWithValue }) => {
    try {
      const res = await API.post(
        accountEndpoints["convert-token"],
        {
          token: access_token,
          backend: "google-oauth2",
          grant_type: "convert_token",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let user = await authAPI(res.data.access_token).get(
        basicUserEndpoints["current-user"]
      );
      return {
        user: user.data,
        token: res.data,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user,updateUser",
  async (data, { rejectWithValue }) => {
    const { access_token, formData } = data;
    try {
      const user = await authAPI(access_token).put(
        basicUserEndpoints["current-user"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return user.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const postJob = createAsyncThunk(
  "job,PostJob",
  async (data, { rejectWithValue }) => {
    const { access_token, formData } = data;
    try {
      const res = await authAPI(access_token).post(
        jobEndpoints["jobs"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const myJob = createAsyncThunk(
  "job,myJob",
  async (data, { rejectWithValue }) => {
    const { access_token, params } = data;
    try {
      const res = await authAPI(access_token).get(
        basicUserEndpoints["my-jobs"](params)
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const retrieve = createAsyncThunk(
  "job,Retrieve",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId } = data;
    try {
      const res = await authAPI(access_token).get(
        basicUserEndpoints["job-retrieve"](orderId)
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const getJoinedShipper = createAsyncThunk(
  "job,getShipper",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId } = data;
    try {
      const res = await authAPI(access_token).get(
        jobEndpoints["listShipper"](orderId)
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const assignJob = createAsyncThunk(
  "job,assignJob",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId, shipperId } = data;
    const formData = new FormData();
    formData.append("shipper", shipperId);
    try {
      const res = await authAPI(access_token).post(
        basicUserEndpoints["assign-job"](orderId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const sendFeedback = createAsyncThunk(
  "job,sendFeedback",
  async (data, { rejectWithValue }) => {
    const { access_token, jobId, formData } = data;
    try {
      const res = await authAPI(access_token).post(
        basicUserEndpoints["send_feedback"](jobId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const viewFeedback = createAsyncThunk(
  "feedback,viewFeedback",
  async (data, { rejectWithValue }) => {
    const { access_token, shipperId } = data;
    try {
      const res = await authAPI(access_token).get(
        basicUserEndpoints["view_feedbacks"](shipperId)
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const myFeedback = createAsyncThunk(
  "feedback,myFeedback",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId } = data;
    try {
      const res = await authAPI(access_token).get(
        basicUserEndpoints["my_feedback"](orderId)
      );
      if (res.status === 204) {
        return null;
      } else {
        return res.data;
      }
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const vnPayCreatePaymentUrl = createAsyncThunk(
  "vnPay,vnPayCreatePayment",
  async (data, { rejectWithValue }) => {
    const { access_token, formData } = data;
    try {
      const res = await authAPI(access_token).post(
        paymentEndpoints["vnpay-payment-url"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const checkOutSuccess = createAsyncThunk(
  "payment,Payment",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId, paymentId } = data;
    const formData = new FormData();
    formData.append("order_id", orderId);
    try {
      const res = await authAPI(access_token).post(
        paymentEndpoints["checkout-success"](paymentId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const getCoupon = createAsyncThunk(
  "coupon,getCoupon",
  async (data, { rejectWithValue }) => {
    const { access_token, key } = data;
    const formData = new FormData();
    formData.append("key", key);
    try {
      const res = await authAPI(access_token).post(
        baseEndpoints["my-coupon"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const getBasicUserToken = (state) => state.basicUserSlice.token;
export const getBasicUserStatus = (state) => state.basicUserSlice.status;
export const getBasicUserProfile = (state) => state.basicUserSlice.user;
export const { setToken, resetBasicUserSlice } = basicUserSlice.actions;
export default basicUserSlice.reducer;
