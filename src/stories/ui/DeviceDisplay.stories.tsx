import { DeviceDisplay } from '../../components/ui';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DeviceDisplay> = {
  component: DeviceDisplay,
  title: 'UI/DeviceDisplay',
};

export default meta;
type Story = StoryObj<typeof DeviceDisplay>;

export const Default: Story = {
  args: {
    RSSI: -51,
    availableCharacteristics: [],
    deviceAddress: '0A828777-8795-F5DC-D97E-DCA4D078FE10',
    deviceName: 'AirPods Pro',
  },
};
