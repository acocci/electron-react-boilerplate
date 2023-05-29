import { DropDown } from '@CanineLizard/react-component-lib';
import { Box, Typography } from '@mui/material';

import { Dashboard, Panel } from '../../../components/ui';
import {
  DashboardType,
  RequiredLayout,
  Roles,
} from '../../../components/ui/Dashboard/Dashboard.types';
import { generateNameValuePairs } from '../../../helpers/options';
import { parseStorage, setStorageObject } from '../../../helpers/storage';
import { GenericRecord } from '../../../types/generic.types';

import { panelMockData } from '../panelMockData';

import type { Meta, StoryObj } from '@storybook/react';

const pairs = generateNameValuePairs(Roles);

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'UI/Dashboard',
  decorators: [
    (Story) => (
      <>
        <Box m={1}>
          <Typography variant="subtitle2">Please Select a Role.</Typography>
        </Box>
        <Box mb={2}>
          <DropDown
            defaultValue={parseStorage('Role')}
            dropDownLabel="Role"
            onChangeCallback={(e) => {
              setStorageObject('Role', e.target.value);
              (window as Window).location = window.location.href;
            }}
            selectOption={pairs}
          />
        </Box>
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;
const dType = DashboardType.HOME;
const storage = parseStorage('Dashboard');
const SC = ({ name }: GenericRecord) => (
  <div>{`Item ${name}: Generic Component`}</div>
);
const components = [
  {
    Comp: () => <Panel {...panelMockData} />,
    id: '1',
  },
  { Comp: () => <SC name={'2'} />, id: 'Two' },
  { Comp: () => <SC name={'3'} />, id: 'Three' },
  { Comp: () => <SC name={'4'} />, id: '4' },
  { Comp: () => <SC name={'5'} />, id: '5' },
];
const layout = [
  { h: 1, i: '1', w: 1, x: 0, y: 0 },
  { h: 2, i: 'Two', maxW: 3, w: 1, x: 1, y: 0 },
  { h: 1, i: 'Three', w: 1, x: 2, y: 0 },
  { h: 1, i: '4', w: 1, x: 0, y: 0 },
  { h: 1, i: '5', w: 1, x: 1, y: 0 },
];

export const WithLayout: Story = {
  args: {
    components,
    editable: true,
    layouts: {
      [RequiredLayout]:
        storage && storage[dType] ? storage[dType][RequiredLayout] : layout,
    },
    roles: [Roles.ADMIN, Roles.CMO],
    type: dType,
  },
};
