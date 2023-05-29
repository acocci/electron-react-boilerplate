import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { sansSerifFontFamily } from '../../theme';

export const AlertContent = styled(Box)(() => ({
  cursor: 'pointer',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),

  '& .device-header': {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    fontWeight: 300,
    lineHeight: '1.25em',
    marginBottom: theme.spacing(3),
  },
}));

export const StyledSelectedListBox = styled(Box)(({ theme }) => ({
  // fontFamily: sansSerifFontFamily,
  marginBottom: theme.spacing(3),

  '& .title': {
    display: 'inline-flex',
    fontFamily: sansSerifFontFamily,
    fontWeight: 500,
    fontSize: 17,
    justifyContent: 'flex-end',
    minWidth: '200px',
    paddingRight: theme.spacing(2),
  },
}));
