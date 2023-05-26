import { GenericRecord } from 'types/generic.types';

import { ConnectedDevices, ConnectState, DeviceList } from './devices.types';

export const mockDevices: DeviceList = [
  {
    RSSI: -52,
    availableCharacteristics: [],
    deviceAddress: '82E13F77-B19E-E4FE-CE12-2E33A5A79F74',
    deviceName: 'iPhone',
  },
  {
    RSSI: -69,
    availableCharacteristics: ['14030001-2713-2f24-2122-f3893daed0b5', 'second characteristic'],
    deviceAddress: '24AD72E9-07ED-6204-C5B2-79512D7CC7F3',
    deviceName: 'PXN-V9',
  },
  {
    RSSI: -44,
    availableCharacteristics: [],
    deviceAddress: '4A88549A-D81E-87C2-8BD9-7E22B9EB7E79',
    deviceName: 'Apple Watch',
  },
  {
    RSSI: -51,
    availableCharacteristics: [],
    deviceAddress: '0A828777-8795-F5DC-D97E-DCA4D078FE10',
    deviceName: 'AirPods Pro',
  },
];

export const mockRows = [
  {
    address: '82E13F77-B19E-E4FE-CE12-2E33A5A79F74',
    characteristics: '',
    connection: '',
    id: 'iPhone',
    device: 'iPhone',
    RSSI: -52,
  },
  {
    address: '24AD72E9-07ED-6204-C5B2-79512D7CC7F3',
    characteristics: '14030001-2713-2f24-2122-f3893daed0b5, second characteristic',
    connection: '14030001-2713-2f24-2122-f3893daed0b5, second characteristic',
    id: 'PXN-V9',
    device: 'PXN-V9',
    RSSI: -69,
  },
  {
    address: '4A88549A-D81E-87C2-8BD9-7E22B9EB7E79',
    characteristics: '',
    connection: '',
    id: 'Apple Watch',
    device: 'Apple Watch',
    RSSI: -44,
  },
  {
    address: '0A828777-8795-F5DC-D97E-DCA4D078FE10',
    characteristics: '',
    connection: '',
    id: 'AirPods Pro',
    device: 'AirPods Pro',
    RSSI: -51,
  },
];

export const mockConnectedDevices: ConnectedDevices = [
  {
    device: '2DB5AD59-A55E-A6CB-E7B4-9104EC14EA0C',
    status: '',
    connectionstate: ConnectState.Connected,
    lastcmdmsgrcv: '2023-03-21T23:29:13.808210',
    error: '',
  },
  {
    device: '4CC9AB7E-5C0C-F254-1798-3B05E1728672',
    status: '',
    connectionstate: ConnectState.Connected,
    lastcmdmsgrcv: '2023-03-21T23:29:13.808210',
    error: '',
  },
];

export const expectedFormatted: GenericRecord = {
  '2DB5AD59-A55E-A6CB-E7B4-9104EC14EA0C': {
    connectionstate: ConnectState.Connected,
    error: '',
    lastcmdmsgrcv: '2023-03-21T23:29:13.808210',
    status: '',
  },
  '4CC9AB7E-5C0C-F254-1798-3B05E1728672': {
    connectionstate: ConnectState.Connected,
    error: '',
    lastcmdmsgrcv: '2023-03-21T23:29:13.808210',
    status: '',
  },
};
