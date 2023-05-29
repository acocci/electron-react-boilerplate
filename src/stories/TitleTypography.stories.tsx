import TitleTypography from '../libs/ui/components/TitleTypography';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TitleTypography> = {
  component: TitleTypography,
  title: 'UI/TitleTypography',
};

export default meta;
type Story = StoryObj<typeof TitleTypography>;

export const Empty: Story = {
  render: () => <TitleTypography title="" />,
};

export const WithTitle: Story = {
  render: () => <TitleTypography title="Hello World!!!" />,
};
