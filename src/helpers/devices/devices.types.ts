/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericArray, GenericStrNumRecord, ReactNode } from 'types/generic.types';

export interface IDeviceSlice {
  availableDevices: GenericStrNumRecord;
  connectedDevices: Array<string>;
}

export enum ConnectState {
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface IStatusMessage {
  connectionstate?: ConnectState.Connected | ConnectState.Disconnected | '';
  device: string;
  device_name?: string;
  error: string;
  lastcmdmsgrcv: string;
  recv_msgs?: string;
  sent_msgs?: string;
  status: string;
}

export type ConnectedDevices = Array<IStatusMessage> | [];

export interface IDevice {
  availableCharacteristics: GenericArray;
  children?: ReactNode;
  deviceAddress: string;
  deviceName: string; // id & device
  RSSI: number;
}
export type DeviceList = Array<IDevice>;

export interface IRow {
  address: string;
  characteristics: string;
  connection: string;
  id: string;
  device: string;
  RSSI: number;
}

export type Rows = Array<IRow>;

// characteristics match
export const deviceWhiteListRegEx: Array<string> = ['0000180d-0000-1000-8000-00805f9b34fb'];
