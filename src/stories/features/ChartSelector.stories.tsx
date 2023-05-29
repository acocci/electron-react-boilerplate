import { Box } from '@mui/material';

import ChartSelector from '../../features/ChartSelector/ChartSelector';
import {
  MultipleChartOptions,
  SingleChartOptions,
} from '../../features/ChartSelector/ChartSelector.types';
import { generateNameValuePairs } from '../../helpers/options';

import { multiline, singleLine } from './mockData';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChartSelector> = {
  component: ChartSelector,
  title: 'features/ChartSelector',
  decorators: [
    (Story) => (
      <Box height={400}>
        <Box height={300}>
          <Story />
        </Box>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChartSelector>;

const chartsSingle = generateNameValuePairs(SingleChartOptions);
const chartsMulti = generateNameValuePairs(MultipleChartOptions);

export const WithData: Story = {
  render: () => <ChartSelector chartOptions={chartsSingle} data={singleLine} />,
};

export const WithDataMulitiple: Story = {
  render: () => <ChartSelector chartOptions={chartsMulti} data={multiline} />,
};
