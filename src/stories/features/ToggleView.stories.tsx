import {
  Columns,
  DisplayTable,
  RowData,
  StatusCircle,
} from '@CanineLizard/react-component-lib';
import { Box } from '@mui/material';
import { map } from 'lodash';

import { ComponentArray } from '../../components/ui/ComponentById/ComponentById.types';
import {
  DashboardType,
  Keys,
  RequiredLayout,
  allRoles,
} from '../../components/ui/Dashboard/Dashboard.types';
import ToggleView from '../../features/ToggleView/ToggleView';
import { formatUTCDate } from '../../helpers/dates';
import { generateLabelValuePairs } from '../../helpers/options';
import { parseStorage } from '../../helpers/storage';
import theme from '../../theme';
import {
  LabelValuePairs,
  ReactEvent,
  StrNumNode,
} from '../../types/generic.types';

import type { Meta, StoryObj } from '@storybook/react';

const dType = DashboardType.EVA;
const storage = parseStorage('Dashboard');
const formatted = formatUTCDate(new Date());
const columns: Columns = [
  { id: 'device', label: 'Device' },
  {
    id: 'status',
    label: 'Status',
    format: (value?: StrNumNode) =>
      value && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StatusCircle
            color={
              value === 'Connected'
                ? theme.palette.success.light
                : theme.palette.error.light
            }
          />
          {value}
        </Box>
      ),
  },
  { id: 'message', label: 'Last Message' },
  { id: 'error', label: 'Error' },
];

const rows: RowData = [
  {
    id: 'Device 1',
    device: 'Device 1',
    status: 'Connected',
    message: formatted,
    error: 'false',
  },
  {
    id: 'Device 2',
    device: 'Device 2',
    status: 'Connected',
    message: formatted,
    error: 'true',
  },
  {
    id: 'Device 3',
    device: 'Device 3',
    status: 'Disconnected',
    message: formatted,
    error: 'false',
  },
];
const components: ComponentArray = [
  {
    Comp: () => <DisplayTable columns={columns} rows={[rows[0]]} />,
    id: 'Device 1',
  },
  {
    Comp: () => <DisplayTable columns={columns} rows={[rows[1]]} />,
    id: 'Device 2',
  },
  {
    Comp: () => <DisplayTable columns={columns} rows={[rows[2]]} />,
    id: 'Device 3',
  },
];
const layout = [
  { h: 1, i: 'Device 1', w: 1, x: 0, y: 0 },
  { h: 1, i: 'Device 2', w: 1, x: 1, y: 0 },
  { h: 1, i: 'Device 3', w: 1, x: 0, y: 0 },
];
const arr: Array<string> | Array<unknown> = map(rows, 'device');
const devices: LabelValuePairs = generateLabelValuePairs(arr);

const handleChange = (_e: ReactEvent, value: LabelValuePairs) => {
  // eslint-disable-next-line no-console
  console.log(value);
};

const meta: Meta<typeof ToggleView> = {
  component: ToggleView,
  title: 'features/Toggleview',
  decorators: [
    (Story) => (
      <Box height={400}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleView>;

export const WithData: Story = {
  render: () => (
    <ToggleView
      autoCompleteProps={{
        label: 'Filter by Device',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (e: ReactEvent, value: any) => handleChange(e, value),
        options: devices,
        multiple: true,
        size: 'medium',
      }}
      dashboardProps={{
        cols: {
          [Keys.LG]: 2,
          [Keys.MD]: 2,
          [Keys.SM]: 2,
        },
        components,
        editable: true,
        layouts: {
          [RequiredLayout]:
            storage && storage[dType] ? storage[dType][RequiredLayout] : layout,
        },
        roles: allRoles,
        type: dType,
      }}
      tableProps={{
        columns,
        rows,
      }}
    />
  ),
};
