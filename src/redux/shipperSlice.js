import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, {
  ENDPOINTS,
  POST_ENDPOINTS,
  ShipperJobEndpoints,
  authAPI,
} from "../configs/API";
import { getCurrentLocation, objectToFormData } from "../features/ultils";
import APIv3, {
  authAPIv3,
  END_POINTS,
  googMapDirection,
  googMapDistanceMatrix,
} from "../configs/APIv3";
var polyline = require("@mapbox/polyline");

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
      clearInterval(state?.lastTimeoutId);
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
          state.token.access_token = action.payload.token.token;
          state.token.expiryTime = action.payload.token.expiryTime;
        }
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
      })

      .addCase(setOnline.fulfilled, (state, action) => {
        state.lastTimeoutId = action.payload;
        state.status = "idle";
      })

      .addCase(setOfflie.fulfilled, (state, acion) => {
        state.lastTimeoutId = null;
      });
  },
});

export const register = createAsyncThunk(
  "user,registerUser",
  async (form, { rejectWithValue }) => {
    const formData = objectToFormData(form);
    try {
      await APIv3.post(END_POINTS["register-user"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return;
    } catch (e) {
      console.log(e);

      return rejectWithValue(e?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "user,loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const token = await APIv3.post(END_POINTS["token"], {
        username: data?.username,
        password: data?.password,
      });

      let user = await authAPIv3(token.data?.result?.token).get(
        END_POINTS["find-shipper-profile"]
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

export const getDistance = createAsyncThunk(
  "distance, getDistance",
  async (data, { rejectWithValue }) => {
    const { origin, destination } = data;
    try {
      const res = await googMapDistanceMatrix(origin, destination).get();
      return res.data?.rows[0].elements[0].distance.text;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getDirection = createAsyncThunk(
  "direction, getDirection",
  async (data, { rejectWithValue }) => {
    const { origin, destination } = data;
    try {
      const res = await googMapDirection(origin, destination).get();
      const points = polyline
        .decode(res?.data?.routes[0].overview_polyline?.points)
        .map(([latitude, longitude]) => ({ latitude, longitude }));
      return points;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getInComeStatistic = createAsyncThunk(
  "statistic, getStatistic",
  async (data, { rejectWithValue }) => {
    const { token, params } = data;
    try {
      const res = await authAPIv3(token).get(
        END_POINTS["shipper-income"](params)
      );
      return res.data.result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response);
    }
  }
);

export const acceptDelivery = createAsyncThunk(
  "accept, acceptDelivery",
  async (data, { rejectWithValue }) => {
    const { access_token, postId } = data;
    try {
      const res = await authAPIv3(access_token).post(
        END_POINTS["shipment-accept"](postId)
      );
      return res.data;
    } catch (err) {
      console.log(err?.response);
      return rejectWithValue(err?.response);
    }
  }
);

export const myJobs = createAsyncThunk(
  "job,myJob",
  async (data, { rejectWithValue }) => {
    const { access_token, params } = data;
    try {
      const res = await authAPIv3(access_token).get(
        END_POINTS["find-post-by-status-list"](params)
      );
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err?.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "job, myJobs",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId, body } = data;
    try {
      const res = await authAPIv3(access_token).post(
        END_POINTS["update-post-status"](orderId),
        body
      );
      return res.data.result;
    } catch (err) {
      console.log(err || err?.response?.data);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const collectCash = createAsyncThunk(
  "cash, collectCash",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId } = data;
    try {
      const res = await authAPIv3(access_token).post(
        END_POINTS["collect-cash"](orderId)
      );
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err?.response);
    }
  }
);

export const getOrder = createAsyncThunk(
  "job, myJobs",
  async (data, { rejectWithValue }) => {
    const { access_token, orderId } = data;
    try {
      const res = await authAPI(access_token).get(
        POST_ENDPOINTS["get-post-by-id"](orderId)
      );
      return res.data.result;
    } catch (err) {
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
        // Change status
        const { shipperSlice } = getState();
        const access_token = shipperSlice?.token?.access_token;
        console.log("access_token: ", access_token);

        await authAPIv3(access_token).post(END_POINTS["change-status"], {
          status: "READY_FOR_TAKE_ORDER",
        });

        return setInterval(async () => {
          const newLocation = await getCurrentLocation();
          const { shipperSlice } = getState();
          const { location, user } = shipperSlice;
          const body = {
            messageType: "UPDATE_SHIPPER_LOCATION",
            content: JSON.stringify({
              ...newLocation,
              shipperId: shipperId,
              vehicleId: user.vehicleId,
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
        }, 10000);
      }
    } catch (err) {
      console.error("Error in setOnline:", err);
      return rejectWithValue(err?.response || "An unexpected error occurred");
    }
  }
);

export const setOfflie = createAsyncThunk(
  "offline,setOfflie",
  async (ws, { getState, rejectWithValue, dispatch }) => {
    const { shipperSlice } = getState();
    const { lastTimeoutId } = shipperSlice;
    try {
      // Change status
      const { shipperSlice } = getState();
      const access_token = shipperSlice?.token?.access_token;
      await authAPIv3(access_token).post(END_POINTS["change-status"], {
        status: "ONLINE",
      });

      if (lastTimeoutId) {
        clearInterval(lastTimeoutId);
        ws.deactivate();
        console.log("Offline: Interval stopped.");
      }
    } catch (err) {
      console.error("Error in setOfflie:", err);
      return rejectWithValue(err?.response || "An unexpected error occurred");
    }
  }
);

export const { setToken, resetShipperSlice, setLocation } =
  shipperSlice.actions;
export const getToken = (state) => state.shipperSlice.token;
export const getShipperProfile = (state) => state.shipperSlice.user;
export const getShipperVihicle = (state) => state.shipperSlice.vehicle;
export default shipperSlice.reducer;
