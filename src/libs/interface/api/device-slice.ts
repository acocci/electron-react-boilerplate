import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDeviceSlice } from '../../../helpers/devices';

const initialState: IDeviceSlice = {
  availableDevices: {},
  connectedDevices: [],
};

const apiSlice = createSlice({
  initialState,
  name: 'Device',
  reducers: {
    setAvailableDevices(state, action) {
      state.availableDevices = action.payload.result;
    },
    setConnectedDevices(state, action: PayloadAction<Array<string>>) {
      state.connectedDevices = action.payload;
    },
  },
});

export const { setAvailableDevices, setConnectedDevices } = apiSlice.actions;
export default apiSlice.reducer;
