import { Panel } from '../../components/ui';

import { panelMockData } from './panelMockData';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Panel> = {
  title: 'UI/Panel',
  component: Panel,
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const WithMockData: Story = {
  render: () => <Panel {...panelMockData} />,
};
