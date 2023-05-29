import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import Header from '../../components/Header/Header';
import { defaultHeaderMenuItems } from '../../components/Header/Header.types';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'LAYOUT/Header',
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    auth: true,
    links: defaultHeaderMenuItems,
    logo: <MonitorHeartIcon />,
    messages: true,
    switchLanguage: true,
    title: 'application.title',
  },
};
