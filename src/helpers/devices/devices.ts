/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowData } from '@CanineLizard/react-component-lib';
import { Layout } from 'react-grid-layout';

import { GenericRecord } from 'types/generic.types';

import { ConnectedDevices, DeviceList } from './devices.types';

// Available Devices
export const inclusionList: Array<string> = ['Polar H'];
export const allAvailableDevices: Record<string, unknown> = {
  inclusion_list: [],
  scan_type: '',
};
export const defaultAvailableDevices = {
  inclusion_list: inclusionList,
  scan_type: 'device_name',
};

export const getDeviceNames = (results: any) =>
  results.map((x: { deviceName: string }) => x.deviceName);

export const formatLayout = (labels: Array<string>, cols: number) => {
  const layout: Array<Layout> = [];
  labels.map((label, index) => layout.push({ h: 1, i: label, w: 1, x: index % cols, y: 0 }));
  return layout;
};

export const formatRows = (deviceList: DeviceList) => {
  const rows: RowData = [];
  deviceList.map(row => {
    const str = row.availableCharacteristics.join(', ');
    return rows.push({
      address: row.deviceAddress,
      characteristics: str,
      connection: str,
      id: row.deviceName,
      device: row.deviceName,
      RSSI: row.RSSI,
    });
  });
  return rows;
};

export const formatConnectedDevices = (deviceList: ConnectedDevices): GenericRecord => {
  const devices = {};
  deviceList.map(item => {
    // destructuring assignment of item
    const { device_name, status, connectionstate, lastcmdmsgrcv, error, recv_msgs, sent_msgs } =
      item;
    const device = {
      [`${item.device}`]: {
        device_name,
        status,
        connectionstate,
        lastcmdmsgrcv,
        error,
        recv_msgs,
        sent_msgs,
      },
    };
    return Object.assign(devices, device);
  });
  return devices;
};
