/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularIndicator } from '@CanineLizard/react-component-lib';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { escapeRegExp } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ConnectButton } from '../../components/ui';
import { formatUTCDateWithSeconds } from '../../helpers/dates';
import { deviceWhiteListRegEx } from '../../helpers/devices';

import { StyledSelectedListBox } from './catalogPage.styles';

export const AvailableDeviceList = ({
  data,
  agent,
}: {
  data: any;
  agent: string;
}) => {
  const { t } = useTranslation();
  const { availableCharacteristics, deviceAddress, deviceName, RSSI } = data;
  const characteristics = availableCharacteristics.join(', ');
  const regX = new RegExp(
    deviceWhiteListRegEx.map((x: string) => escapeRegExp(String(x))).join('|'),
    'gi'
  );
  const isMatch = characteristics.match(regX);
  const newValue = 100 + Number(RSSI);

  return (
    <Grid container>
      <Grid sx={{ maxWidth: '80px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularIndicator
            value={newValue}
            size={60}
            thickness={4}
            tooltip={`${t('devices.signalStrength')}: RSSI ${RSSI}`}
          />
        </Box>
      </Grid>
      <Grid xs>
        <Typography component={'h2'} variant="h5">
          {deviceName}
        </Typography>
        <Box mb={2}>
          <Typography component={'h3'} variant="h6">
            {t('devices.deviceId')}:
          </Typography>
          {deviceAddress}
        </Box>
        <Box mb={2}>
          <Typography component={'h3'} variant="h6">
            {t('devices.characteristics')}:
          </Typography>
          {characteristics || t('devices.na')}
        </Box>
        {isMatch && (
          <Box mb={2}>
            <ConnectButton
              address={deviceAddress}
              agent={agent}
              name={deviceName}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export const SelectedDeviceList = ({
  data,
  agent,
}: {
  data: any;
  agent: string;
}) => {
  const { t } = useTranslation();
  const { deviceAddress, device_name, stats } = data;
  const { sent_msg, recv_msg, last_sent_ts, last_recv_ts } = stats;

  return (
    <StyledSelectedListBox mb={4}>
      <Grid container spacing={3}>
        <Grid sx={{ alignContent: 'flex-start' }}>
          <ConnectButton
            address={deviceAddress}
            agent={agent}
            name={device_name}
            variant={'contained'}
          />
        </Grid>
        <Grid xs>
          <Box mb={0.5}>
            <Box className="title" component={'span'}>
              {t('devices.deviceName')}:
            </Box>
            {device_name}
          </Box>
          <Box mb={0.5}>
            <Box className="title" component={'span'}>
              {t('devices.deviceAdddress')}:
            </Box>
            {deviceAddress}
          </Box>
          <Box mb={0.5}>
            <Box className="title" component={'span'}>
              {t('devices.lastSent')}:
            </Box>
            {formatUTCDateWithSeconds(last_sent_ts, true)}
          </Box>
          <Box mb={0.5}>
            <Box className="title" component={'span'}>
              {t('devices.lastRecieved')}:
            </Box>
            {formatUTCDateWithSeconds(last_recv_ts, true)}
          </Box>
          <Box mb={0.5}>
            <Box className="title" component={'span'}>
              {t('devices.messagesSent')}:
            </Box>
            {sent_msg}
          </Box>
          <Box mb={0.5}>
            <Box className="title" component={'span'}>
              {t('devices.messagesReceived')}:
            </Box>
            {recv_msg}
          </Box>
        </Grid>
      </Grid>
    </StyledSelectedListBox>
  );
};
