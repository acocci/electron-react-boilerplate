import { GenericRecord } from 'types/generic.types';

import { CatalogMessages } from './catalog.types';

export const mockCatalog: CatalogMessages = [
  {
    agentId: 'e79aa753-4335-4750-9134-024ab08XXXXX',
    timestamp: '2023-03-27T17:58:39.361684',
    available_device_list: [
      {
        deviceAddress: 'B8:3A:9D:22:FF:59',
        deviceName: 'ALAM (22:FF:58)',
        availableCharacteristics: [],
        RSSI: -90,
      },
      {
        deviceAddress: 'D0:64:BA:1A:E8:6A',
        deviceName: 'NJUMR',
        availableCharacteristics: ['0000feaf-0000-1000-8000-00805f9b34fb'],
        RSSI: -84,
      },
      {
        deviceAddress: 'C4:E0:F4:03:B3:E3',
        deviceName: 'CAMEO3-28808A',
        availableCharacteristics: [
          '00001800-0000-1000-8000-00805f9b34fb',
          '00001801-0000-1000-8000-00805f9b34fb',
          '0000180a-0000-1000-8000-00805f9b34fb',
        ],
        RSSI: -86,
      },
    ],
    selected_device_list: [],
  },
  {
    agentId: 'e79aa753-4335-4750-9134-024ab0834017',
    timestamp: '2023-03-27T17:58:39.361684',
    available_device_list: [
      {
        deviceAddress: 'B8:3A:9D:22:FF:59',
        deviceName: 'ALAM (22:FF:58)',
        availableCharacteristics: [],
        RSSI: -90,
      },
      {
        deviceAddress: 'D1:17:1F:93:E1:9F',
        deviceName: 'N33HM',
        availableCharacteristics: ['0000feaf-0000-1000-8000-00805f9b34fb'],
        RSSI: -88,
      },
      {
        deviceAddress: 'A0:D0:5B:A2:5D:A2',
        deviceName: '[AV] Samsung Soundbar Q7CB',
        availableCharacteristics: [],
        RSSI: -89,
      },
    ],
    selected_device_list: [],
  },
];

export const expectedFormatted: GenericRecord = {
  'e79aa753-4335-4750-9134-024ab08XXXXX': {
    timestamp: '2023-03-27T17:58:39.361684',
    available_device_list: [
      {
        deviceAddress: 'B8:3A:9D:22:FF:59',
        deviceName: 'ALAM (22:FF:58)',
        availableCharacteristics: [],
        RSSI: -90,
      },
      {
        deviceAddress: 'D0:64:BA:1A:E8:6A',
        deviceName: 'NJUMR',
        availableCharacteristics: ['0000feaf-0000-1000-8000-00805f9b34fb'],
        RSSI: -84,
      },
      {
        deviceAddress: 'C4:E0:F4:03:B3:E3',
        deviceName: 'CAMEO3-28808A',
        availableCharacteristics: [
          '00001800-0000-1000-8000-00805f9b34fb',
          '00001801-0000-1000-8000-00805f9b34fb',
          '0000180a-0000-1000-8000-00805f9b34fb',
        ],
        RSSI: -86,
      },
    ],
    selected_device_list: [],
  },
  'e79aa753-4335-4750-9134-024ab0834017': {
    timestamp: '2023-03-27T17:58:39.361684',
    available_device_list: [
      {
        deviceAddress: 'B8:3A:9D:22:FF:59',
        deviceName: 'ALAM (22:FF:58)',
        availableCharacteristics: [],
        RSSI: -90,
      },
      {
        deviceAddress: 'D1:17:1F:93:E1:9F',
        deviceName: 'N33HM',
        availableCharacteristics: ['0000feaf-0000-1000-8000-00805f9b34fb'],
        RSSI: -88,
      },
      {
        deviceAddress: 'A0:D0:5B:A2:5D:A2',
        deviceName: '[AV] Samsung Soundbar Q7CB',
        availableCharacteristics: [],
        RSSI: -89,
      },
    ],
    selected_device_list: [],
  },
};
