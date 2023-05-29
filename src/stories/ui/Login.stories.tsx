import { Box } from '@mui/material';

import { Login } from '../../components/ui';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'UI/Login',
  decorators: [
    (Story) => (
      <Box height={300}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Login>;

export const WithData: Story = { args: {} };
