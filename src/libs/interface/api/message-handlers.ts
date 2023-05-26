/* eslint-disable @typescript-eslint/no-unused-vars */
import { LevelString, log } from 'helpers/logger';

import { store } from '../../../store/store';

import { setCatalogMessage } from './catalog-slice';
import { setAvailableDevices, setConnectedDevices } from './device-slice';
import { setStatusMessages } from './message-slice';

export type MessageHandler = (topic: string, payload: Buffer, _packet: unknown) => void;

// const storeResultInfo: (resultKey: string) => ResultHandler = (resultKey: string) => () => {};
// TODO: what would result notification look like?
const notifyResult: (resultKey: string) => MessageHandler = (_resultKey: string) => () => {};

export const noopHandler = (_topic: string, payload: Buffer, _packet: unknown) => {};

export const logMessageHandler = (_topic: string, payload: Buffer, _packet: unknown) => {
  log(LevelString.INFO, `heart rate message recieved: ${payload.toString()}`);
};

export const dataCatalogMessageHandler = (_topic: string, payload: Buffer, _packet: unknown) => {
  store.dispatch(setCatalogMessage(JSON.parse(payload.toString())));
};

export const statusMessageHandler = (_topic: string, payload: Buffer, _packet: unknown) => {
  store.dispatch(setStatusMessages(JSON.parse(payload.toString())));
  // log(LevelString.INFO, `connection Status: ${JSON.parse(payload.toString()).connectionstate}`);
};

// handler for LISTAVAILABLEDEVICES
export const handleAvailableDevices = (_topic: string, payload: Buffer, _packet: unknown) => {
  store.dispatch(setAvailableDevices(JSON.parse(payload.toString())));
};
// handler for LISTCONNECTEDDEVICES
export const handleConnectedDevices = (_topic: string, payload: Buffer, _packet: unknown) => {
  setConnectedDevices(JSON.parse(payload.toString()));
};
// handler for SELECTDEVICE
export const handleSelectDevice = notifyResult('selectDevice');
// handler for SETCHARACTERISTICS
export const handleSetCharacteristics = notifyResult('setCharacteristic');
// handler for SETNOTIFICATIONS
export const handleSetNotifications = notifyResult('setNotification');
// handler for DISCONNECTDEVICE

export const handleDisconnectDevice = notifyResult('disconnectDevice');
