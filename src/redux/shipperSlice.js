import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, {
  POST_ENDPOINTS,
  ShipperJobEndpoints,
  accountEndpoints,
  authAPI,
  shipperEndpoints,
} from "../configs/API";
import { getCurrentLocation, objectToFormData } from "../features/ultils";

const INIT_STATE = {
  user: {},
  status: "idle",
  token: { access_token: "", refresh_token: "" },
  lastTimeoutId: null,
  location: null,
};

const shipperSlice = createSlice({
  name: "shipperSlice",
  initialState: INIT_STATE,
  reducers: {
    resetShipperSlice: (state, action) => {
      Object.assign(state, INIT_STATE);
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
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
          state.token = action.payload.token;
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
          state.token.access_token = action.payload.token.accessToken;
          state.token.refresh_token = action.payload.token.refreshToken;
        }
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(setOnline.fulfilled, (state, action) => {
        state.lastTimeoutId = action.payload;
        state.status = "idle";
      });
  },
});

export const register = createAsyncThunk(
  "user,registerUser",
  async (obj, { rejectWithValue }) => {
    const formData = objectToFormData(obj);
    try {
      let user = await API.post(
        accountEndpoints["register-shipper"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user,loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const token = await API.post(accountEndpoints["login"], {
        username: data?.username,
        password: data?.password,
      });

      let user = await authAPI(token.data?.result?.accessToken).get(
        shipperEndpoints["my-info"]
      );

      return {
        user: user?.data?.result,
        token: token?.data?.result,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const viewJob = createAsyncThunk(
  "job, viewJob",
  async (data, { rejectWithValue }) => {
    const { token, jobId } = data;
    try {
      const res = await authAPI(token).get(
        ShipperJobEndpoints["job-retrieve"](jobId)
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getDuration = createAsyncThunk(
  "duration, getDuration",
  async (data, { rejectWithValue }) => {
    const { token, lat1, long1, lat2, long2 } = data;
    const param = `p1=${lat1},${long1}&p2=${lat2},${long2}`;
    try {
      const res = await authAPI(token).get(shipperEndpoints["duration"](param));
      return res.data.result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response);
    }
  }
);

export const joinJob = createAsyncThunk(
  "job, joinJob",
  async (data, { rejectWithValue }) => {
    const { token, postId } = data;
    try {
      const res = await authAPI(token).post(
        POST_ENDPOINTS["get-post-by-id"](postId)
      );
      return res.status;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response);
    }
  }
);

export const myJobs = createAsyncThunk(
  "job, myJobs",
  async (data, { rejectWithValue }) => {
    const { access_token, params } = data;
    try {
      const res = await authAPI(access_token).get(
        ShipperJobEndpoints["my-jobs"](params)
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response);
    }
  }
);

export const compeleteJob = createAsyncThunk(
  "job, myJobs",
  async (data, { rejectWithValue }) => {
    const { access_token, jobId } = data;
    try {
      const res = await authAPI(access_token).post(
        ShipperJobEndpoints["complete"](jobId)
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response);
    }
  }
);

export const setOnline = createAsyncThunk(
  "online,setOnline",
  async (data, { getState, rejectWithValue, dispatch }) => {
    const { ws, shipperId } = data;
    try {
      if (ws.connected) {
        return setInterval(async () => {
          const newLocation = await getCurrentLocation();
          const { shipperSlice } = getState();
          const { location } = shipperSlice;

          const body = {
            messageType: "UPDATE_SHIPPER_LOCATION",
            content: JSON.stringify({
              ...newLocation,
              shipperId: shipperId,
            }),
          };
          if (location) {
            body.content["prevLatitude"] = location.latitude;
            body.content["prevLongitude"] = location.longitude;
          }
          ws.publish({
            destination: `/app/shipper/${shipperId}`,
            body: body,
          });
          dispatch(setLocation(newLocation));
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response);
    }
  }
);

export const { setToken, resetShipperSlice, setLocation } =
  shipperSlice.actions;
export const getToken = (state) => state.shipperSlice.token;
export const getShipperProfile = (state) => state.shipperSlice.user;
export default shipperSlice.reducer;
