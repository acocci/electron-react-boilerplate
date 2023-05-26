import CloudDoneIcon from '@mui/icons-material/CloudDone';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ReplayIcon from '@mui/icons-material/Replay';
import { AppBar, Box, Fab, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IControls } from './Dashboard.types';

const DashboardControlOverlay = ({ disableSave, onEdit, onReset, onSave }: IControls) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const onLockToggle = () => {
    onEdit();
    setOpen(!open);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{ bottom: 10, boxShadow: 'none', top: 'auto' }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-evenly', margin: '0 auto', width: '180px' }}
      >
        <Tooltip title={open ? t('dashboard.controls.unlock') : t('dashboard.controls.lock')}>
          <Fab color="default" aria-label="edit" size="small" onClick={() => onLockToggle()}>
            {open ? <LockOpenIcon /> : <LockIcon />}
          </Fab>
        </Tooltip>
        <Tooltip title={t('dashboard.controls.reset')}>
          <Fab color="info" aria-label="edit" size="small" onClick={() => onReset()}>
            <ReplayIcon />
          </Fab>
        </Tooltip>
        {!disableSave && (
          <Tooltip title={t('dashboard.controls.save')}>
            <Fab color="success" aria-label="edit" size="small" onClick={() => onSave()}>
              <CloudDoneIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>
    </AppBar>
  );
};

export default DashboardControlOverlay;
