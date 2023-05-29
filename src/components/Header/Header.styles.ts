import { AppBar } from '@mui/material';
import { styled } from '@mui/system';

import { sansSerifFontFamily } from '../../theme';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '& h1': {
    margin: 0,
  },
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontFamily: sansSerifFontFamily,
}));
