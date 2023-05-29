import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';

import theme, { sansSerifFontFamily } from '../../../theme';

export const PanelHeader = styled(Grid)({
  '& .MuiButtonBase-root': {
    '&.MuiButton-contained': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    padding: theme.spacing(0.5),
  },
  '& h2': {
    fontFamily: sansSerifFontFamily,
    fontSize: 15,
    fontWeight: 600,
    marginLeft: theme.spacing(1),
  },
  '& ul li': {
    padding: 0,
  },
  backgroundColor: '#b3b3b3',
  border: '0.5px solid #666666',
  fontFamily: sansSerifFontFamily,
  margin: 0,
  width: '100%',
});
