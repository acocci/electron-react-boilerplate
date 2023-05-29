/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertDisplay } from '@CanineLizard/react-component-lib';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AlertColor, Box, IconButton } from '@mui/material';
import { formatISO } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { diffInSeconds, formatUTCDateWithSeconds } from '../../helpers/dates';
import { getStorage, setStorageString } from '../../helpers/storage';
import { removeCatalogMessage } from '../../libs/interface/api/catalog-slice';
import { store } from '../../store/store';

import { AlertContent } from './catalogPage.styles';

const AgentButton = ({
  active,
  agentId,
  agentTimeOrig,
  timestamp,
  handleClick,
}: {
  active?: boolean;
  agentId: string;
  agentTimeOrig: any;
  timestamp: string;
  handleClick: (id: string) => void;
}) => {
  const { t } = useTranslation();
  const [severityLevel, setSeverityLevel] = useState<AlertColor>('success');

  useMemo(() => {
    setStorageString(agentId, timestamp);
  }, [agentId, timestamp]);

  const range: Record<string, number> = {
    info: 50, // diconnected >= 50
    warning: 100, // diconnected > 100
    error: 160, // diconnected > 100
    max: 200, // stop setting severity & msg
  };

  useEffect(() => {
    if (agentTimeOrig && timestamp) {
      const interval = window.setInterval(() => {
        const nowDate = String(new Date().toISOString());
        const timestampDate = String(formatISO(new Date(getStorage(agentId))));

        const diff = diffInSeconds(nowDate, timestampDate);
        if (diff < range.info) {
          setSeverityLevel('success');
        } else if (diff > range.info && diff < range.warning) {
          setSeverityLevel('info');
        } else if (diff > range.warning && diff < range.error) {
          setSeverityLevel('warning');
        } else if (diff > range.error && diff < range.max) {
          setSeverityLevel('error');
        } else if (diff >= range.max) {
          window.clearInterval(interval);
          store.dispatch(removeCatalogMessage(agentId));
        }
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentTimeOrig, timestamp]);

  return (
    <AlertContent onClick={() => handleClick(agentId)}>
      <AlertDisplay
        action={
          <>
            {active && (
              <IconButton aria-label="close" color="inherit">
                <CheckBoxIcon />
              </IconButton>
            )}
          </>
        }
        severity={severityLevel as AlertColor}
        sx={{ '& .MuiAlert-message': { width: '100%' } }}
        // title={tbd}
      >
        <Box>
          {t('devices.agentId')}: {agentId}
        </Box>
        <Box>
          {t('devices.lastMsgRecieved')}:{' '}
          {formatUTCDateWithSeconds(timestamp, true)}
        </Box>
      </AlertDisplay>
    </AlertContent>
  );
};

export default AgentButton;
