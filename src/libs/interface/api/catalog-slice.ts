/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, current } from '@reduxjs/toolkit';
import { omit } from 'lodash';

import { formatCatalog } from 'helpers/catalog';
import { GenericRecord } from 'types/generic.types';

const initialState: GenericRecord = {};

const catalogSlice = createSlice({
  initialState,
  name: 'Catalog',
  reducers: {
    setCatalogMessage(state, action) {
      const currentState = current(state);
      const currentCatalog = currentState.catalogMessage;
      const newCatalog = formatCatalog([action.payload]);

      if (!currentCatalog || Object.keys(currentState).length < 1) {
        state.catalogMessage = newCatalog;
      } else if (currentCatalog) {
        state.catalogMessage = { ...currentCatalog, ...newCatalog };
      }
    },
    removeCatalogMessage(state, action) {
      const currentState = current(state);
      const currentCatalog: any = currentState.catalogMessage;

      const newCatalog = omit(currentCatalog, [`${action.payload}`]);
      state.catalogMessage = newCatalog;
    },
  },
});

export const { removeCatalogMessage, setCatalogMessage } = catalogSlice.actions;
export default catalogSlice.reducer;
