import { createSlice, createSelector } from "@reduxjs/toolkit";
import SocketClient from "../socket/SocketClient";

const INIT_SOCKET = null;

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: INIT_SOCKET,
  reducers: {
    initWebSocket: (state, action) => {
      if (state !== null) {
        state = action.payload;
      }
    },
  },
});
export const getSocket = (state) => state.socketSlice;
export const { initWebSocket } = socketSlice.actions;
export default socketSlice.reducer;
