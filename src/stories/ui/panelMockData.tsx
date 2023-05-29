import { Button } from '@mui/material';

import { defaultIndicatorProps, IPanelProps } from '../../components/ui';

export const panelMockData: IPanelProps = {
  actionBtn: (
    <Button variant="contained" disableElevation>
      Action
    </Button>
  ),
  children: <>This is some text</>,
  indicator: defaultIndicatorProps,
  menuItems: [
    {
      name: 'Item one',
    },
    {
      name: 'Item two',
    },
  ],
  title: 'Display panel sample test',
};
