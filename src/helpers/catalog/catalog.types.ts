import { IDevice } from '../devices/devices.types';

export interface ISelectedDevice {
  deviceAddress?: string;
  stats?: {
    last_recv_ts?: string;
    last_sent_ts?: string;
    recv_msg?: number;
    sent_msg?: number;
  };
}

export interface ICatalogMessage {
  agentId?: string;
  available_device_list?: Array<IDevice> | [];
  selected_device_list?: Array<ISelectedDevice> | [];
  timestamp?: string;
}

export type CatalogMessages = Array<ICatalogMessage> | [];
