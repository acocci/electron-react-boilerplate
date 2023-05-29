import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import logger from 'redux-logger';

import { authApi } from '../components/ui/login/AuthApi';

import loginReducer from '../components/ui/login/Login-slice';
import catalogReducer from '../libs/interface/api/catalog-slice';
import deviceReducer from '../libs/interface/api/device-slice';
import messageReducer from '../libs/interface/api/message-slice';

const isDev = window?.electron?.Env ? window.electron.Env.isDev() : false;

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: isDev,
    savePreviousLocations: 1,
  });

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    devTools: isDev,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: true })
        .concat(sagaMiddleware)
        .concat(routerMiddleware)
        .concat(logger)
        .concat([authApi.middleware]),
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      router: routerReducer,
      user: loginReducer,
      devices: deviceReducer,
      messages: messageReducer,
      catalog: catalogReducer,
    },
  });

  return store;
};

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const history = createReduxHistory(store);
