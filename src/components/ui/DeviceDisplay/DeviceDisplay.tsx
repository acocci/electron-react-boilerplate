import { CircularIndicator } from '@CanineLizard/react-component-lib';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { escapeRegExp } from 'lodash';
import { useTranslation } from 'react-i18next';

import { deviceWhiteListRegEx, IDevice } from 'helpers/devices';

const DeviceDisplay = ({
  availableCharacteristics,
  children,
  deviceAddress,
  deviceName,
  RSSI,
}: IDevice) => {
  const { t } = useTranslation();
  const characteristics = availableCharacteristics.join(', ');
  const regX = new RegExp(
    deviceWhiteListRegEx.map((x: string) => escapeRegExp(String(x))).join('|'),
    'gi',
  );
  const isMatch = characteristics.match(regX);
  const newValue = 100 + Number(RSSI);
  return (
    <Box m={3}>
      <Grid container>
        <Grid>
          <Box pr={3}>
            <CircularIndicator
              value={newValue}
              tooltip={`${t('devices.signalStrength')}: RSSI ${RSSI}`}
              size={80}
            />
          </Box>
        </Grid>
        <Grid>
          <Typography component={'h2'} variant="h4">
            {deviceName}
          </Typography>
          <Box mb={2}>
            <Typography component={'h3'} variant="h5">
              {t('devices.deviceId')}:
            </Typography>
            {deviceAddress}
          </Box>
          <Box mb={2}>
            <Typography component={'h3'} variant="h5">
              {t('devices.characteristics')}:
            </Typography>
            {characteristics || t('devices.na')}
          </Box>
          {isMatch && children && (
            <Box mb={2}>
              <>{children}</>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceDisplay;
