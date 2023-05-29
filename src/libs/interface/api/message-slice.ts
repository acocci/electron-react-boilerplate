import { createSlice, current } from '@reduxjs/toolkit';

import { GenericRecord } from 'types/generic.types';
import { formatConnectedDevices } from '../../../helpers/devices';

const initialState: GenericRecord = {};

const messageSlice = createSlice({
  initialState,
  name: 'Message',
  reducers: {
    setStatusMessages(state, action) {
      const currentState = current(state);
      const currentStatus = currentState.statusMessages;
      const newStatus = formatConnectedDevices([action.payload]);

      if (!currentStatus || Object.keys(currentState).length < 1) {
        state.statusMessages = newStatus;
      } else if (currentStatus) {
        state.statusMessages = { ...currentStatus, ...newStatus };
      }
    },
    removeStatusMessage(state, action) {
      const currentState = current(state);
      const currentStatus = currentState.statusMessages;

      if (currentStatus) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newState: any = { ...currentStatus };
        delete newState[action.payload];
        state.statusMessages = { ...newState };
      }
    },
  },
});

export const { removeStatusMessage, setStatusMessages } = messageSlice.actions;
export default messageSlice.reducer;
