import {
  ListMenu,
  MenuTypes,
  StatusCircle,
} from '@CanineLizard/react-component-lib';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Collapse, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { truncate } from 'lodash';
import { useState } from 'react';

import {
  defaultIndicatorProps,
  IPanelProps,
  PanelIndicator,
} from '../../../components/ui';
import theme from '../../../theme';

import { PanelHeader } from './Panel.styles';

const Panel = ({
  actionBtn,
  children,
  indicator,
  menuItems,
  handleClose,
  title,
}: IPanelProps) => {
  const { easeIn, easeOut } = theme.transitions.easing;
  const [open, setOpen] = useState<boolean>(true);
  const { indicatorFill, indicatorDisabled, indicatorDisplay }: PanelIndicator =
    indicator || defaultIndicatorProps;
  const truncateTitle = 100;
  const displayTitle = truncate(title, {
    length: truncateTitle,
    separator: ' ',
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <PanelHeader container spacing={1} alignItems="center">
        <Grid xs>
          <Tooltip title={title.length > truncateTitle ? title : ''}>
            <>
              {indicatorDisplay && (
                <Box
                  sx={{ display: 'block', float: 'left', lineHeight: '14px' }}
                >
                  <StatusCircle
                    color={indicatorFill}
                    disabled={indicatorDisabled}
                  />
                </Box>
              )}
              <Typography variant="h2">{displayTitle}</Typography>
            </>
          </Tooltip>
        </Grid>
        <Grid>{actionBtn && <>{actionBtn}</>}</Grid>
        <Grid>
          <IconButton onClick={() => handleToggle()}>
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          {menuItems && (
            <IconButton>
              <ListMenu
                menuItems={[
                  { ico: <MoreHorizIcon />, name: '', secondary: menuItems },
                ]}
                menuType={MenuTypes.anchorMenu}
              />
            </IconButton>
          )}
          {handleClose && (
            <IconButton onClick={() => handleClose()}>
              <CloseIcon />
            </IconButton>
          )}
        </Grid>
      </PanelHeader>
      <Collapse
        in={open}
        easing={{
          enter: easeIn,
          exit: easeOut,
        }}
      >
        {children && <Box m={1}>{children}</Box>}
      </Collapse>
    </Box>
  );
};

export default Panel;
