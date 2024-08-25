import {
  createSlice,
  createSelector,
  current,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import SocketClient from "../socket/SocketClient";
import { webSocketUrl } from "../configs/API";

const INIT_SOCKET = {
  ws: null,
  status: "ideal",
};

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: INIT_SOCKET,
  reducers: {
    initWebSocket: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectWebsocket.fulfilled, (state, action) => {
      state.ws = action.payload;
    });
  },
});

export const connectWebsocket = createAsyncThunk(
  "ws,connectWs",
  async (accessToken, { rejectWithValue }) => {
    try {
      const socketClient = new SocketClient(webSocketUrl, accessToken);
      await socketClient.awaitConnect();
      return socketClient;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getSocket = (state) => state.socketSlice.ws;
export const { initWebSocket } = socketSlice.actions;
export default socketSlice.reducer;
