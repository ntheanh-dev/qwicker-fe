import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { SHIPMENTYPE } from "../constants";
import { getCurrentDateTime } from "../features/ultils";

export const INITIAL_ADDRESS = {
  contactName: "",
  phoneNumber: "",
  apartmentNumber: "",

  postalCode: "",
  addressLine: "",
  formattedAddress: "",
  latitude: "",
  longitude: "",
};

export const INIT_STATE = {
  pickupLocation: INITIAL_ADDRESS,
  dropLocation: INITIAL_ADDRESS,
  type: SHIPMENTYPE.NOW,
  pickupDatetime: {
    date: null,
    time: "00:00",
  },
  cost: null,
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: INIT_STATE,
  reducers: {
    resetShipmentSlice: (state, action) => {
      Object.assign(state, INIT_STATE);
    },
    addPickUp: (state, action) => {
      for (var key in action.payload) {
        if (state.pickupLocation.hasOwnProperty(key)) {
          state.pickupLocation[key] = action.payload[key];
        }
      }
    },
    addDeliveryAddress: (state, action) => {
      for (var key in action.payload) {
        if (state.dropLocation.hasOwnProperty(key)) {
          state.dropLocation[key] = action.payload[key];
        }
      }
    },
    addAdditionalPickUpInfo: (state, action) => {
      state.pickupLocation.contact = action.payload.contact;
      state.pickupLocation.phoneNumber = action.payload.phoneNumber;
    },
    addAdditionalDeliveryAddressInfo: (state, action) => {
      state.dropLocation.contact = action.payload.contact;
      state.dropLocation.phoneNumber = action.payload.phoneNumber;
    },

    addDate: (state, action) => {
      state.pickupDatetime.date = action.payload;
      state.type = SHIPMENTYPE.LATTER;
    },
    addTime: (state, action) => {
      state.pickupDatetime.time = action.payload;
      state.type = SHIPMENTYPE.LATTER;
    },
    setShipmentTypeToNow: (state, action) => {
      state.pickupDatetime.type = SHIPMENTYPE.NOW;
      state.pickupDatetime.date = null;
      state.pickupDatetime.time = null;
    },
    addCost: (state, action) => {
      state.cost = action.payload;
    },
    addDiscount: (state, action) => {
      const discount = action.payload;
      (state.cost / 100) * discount;
    },
  },
});

export const getDate = (state) => state.shipment.pickupDatetime.date;
export const getTime = (state) => state.shipment.pickupDatetime.time;
export const isDateTimeFulFill = createSelector(
  getDate,
  getTime,
  (date, time) => {
    return date !== null && time !== null;
  }
);

export const {
  addPickUp,
  addDeliveryAddress,
  addAdditionalPickUpInfo,
  addAdditionalDeliveryAddressInfo,
  addDate,
  addTime,
  setShipmentTypeToNow,
  addCost,
  resetShipmentSlice,
  addDiscount,
} = shipmentSlice.actions;
export const getShipmentType = (state) => state.shipment.type;
export const getPickUP = (state) => state.shipment.pickupLocation;
export const getDeliveryAddress = (state) => state.shipment.dropLocation;
export const getCost = (state) => state.shipment.cost;
export const getShipment = (state) => state.shipment;
export const getShipMentForm = createSelector(
  (state) => state.shipment,
  (s) => {
    let { pickupDatetime, pickupLocation, dropLocation, ...rest } = s;
    let shipmentDateTime = "";
    if (s.type === SHIPMENTYPE.NOW) {
      shipmentDateTime = getCurrentDateTime();
    } else {
      shipmentDateTime = `${pickupDatetime.date.replaceAll("/", "-")} ${
        pickupDatetime.time
      }`;
    }
    return {
      pickupLocation: pickupLocation,
      dropLocation: dropLocation,
      pickupDatetime: shipmentDateTime,
      ...rest,
    };
  }
);
export default shipmentSlice.reducer;
