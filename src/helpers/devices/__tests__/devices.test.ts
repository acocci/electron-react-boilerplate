import { formatConnectedDevices, formatLayout, formatRows, getDeviceNames } from '../devices';
import { expectedFormatted, mockConnectedDevices, mockDevices, mockRows } from '../devices.mocks';

describe('Generate Device Names', () => {
  it('should return a list of all devices', () => {
    const deviceList = getDeviceNames(mockDevices);
    expect(deviceList).toEqual(['iPhone', 'PXN-V9', 'Apple Watch', 'AirPods Pro']);
  });
});

describe('Generate Dashboard Layout', () => {
  it('should return layout of devices in 2 columns', () => {
    const deviceList = mockDevices.map(x => x.deviceName);
    const layout = formatLayout(deviceList, 2);
    expect(layout).toEqual([
      { h: 1, i: 'iPhone', w: 1, x: 0, y: 0 },
      { h: 1, i: 'PXN-V9', w: 1, x: 1, y: 0 },
      { h: 1, i: 'Apple Watch', w: 1, x: 0, y: 0 },
      { h: 1, i: 'AirPods Pro', w: 1, x: 1, y: 0 },
    ]);
  });
});

describe('Generate Table Rows of Data', () => {
  it('should generate array of data for table display', () => {
    const rows = formatRows(mockDevices);
    expect(rows).toEqual(mockRows);
  });
});

describe('Generate formatted devices', () => {
  it('should return a list of formatted device messages', () => {
    const formattedDevices = formatConnectedDevices(mockConnectedDevices);
    expect(formattedDevices).toEqual(expectedFormatted);
  });
});
