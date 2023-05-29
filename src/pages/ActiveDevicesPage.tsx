/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertDisplay } from '@CanineLizard/react-component-lib';
import { AlertColor, Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Severity,
  snackBarDefaults,
} from '../components/ui/SnackbarDisplay/SnackbarDisplay.types';
import { ConnectionContext } from '../context/ConnectionContext';
import { diffInSeconds, formatUTCDateWithSeconds } from '../helpers/dates';
import { ConnectState, IStatusMessage } from '../helpers/devices';
import { LevelString, log } from '../helpers/logger';
import { AgentCMD } from '../libs/interface/api/connection';
import TitleTypography from '../libs/ui/components/TitleTypography';
import { useAppSelector } from '../store/hooks';

interface IActiveDevice {
  agent: string;
  device: unknown;
  deviceId: string;
  deviceObj: any;
}

const Device = ({ agent, device, deviceId, deviceObj }: IActiveDevice) => {
  const { t } = useTranslation();
  const { connection } = useContext(ConnectionContext);
  const { enqueueSnackbar } = useSnackbar();
  const [severityLevel, setSeverityLevel] = useState<AlertColor>('success');
  const [disconnectedMsg, setDisconnectedMsg] = useState<string>('');
  const deviceMessages = get(device, deviceId);

  const {
    connectionstate,
    device_name,
    error,
    lastcmdmsgrcv,
    status,
    recv_msgs,
    sent_msgs,
  }: IStatusMessage = useMemo(() => deviceMessages, [deviceMessages]);

  const disconnected = useMemo(
    () => connectionstate === ConnectState.Disconnected,
    [connectionstate]
  );

  const diff = useMemo(() => {
    if (disconnected) {
      const rec = get(deviceObj, 'last_recv_ts');
      const sent = get(deviceObj, 'last_sent_ts');
      return diffInSeconds(rec, sent);
    }
    return -1;
  }, [deviceObj, disconnected]);

  const disconnectDevice = async () => {
    connection.sendCMD(AgentCMD.DisconnectDevice, agent, {
      deviceid: deviceId,
      force_disconnect: true,
    });
  };

  const disconnectSnackbar = async () => {
    enqueueSnackbar(`${t('devices.disconnecting')} ${device_name}`, {
      ...snackBarDefaults,
      autoHideDuration: 6000,
      variant: Severity.error,
    });
  };

  const range: Record<string, number> = {
    success: -1, // connected is negative value
    default: 10,
    info: 20, // diconnected < 20
    warning: 80, // diconnected < 80
    max: 240, // stop setting severity & msg
    // error is > 80
  };

  useMemo(() => {
    if (diff && diff < range.max) {
      if (diff <= range.success) {
        setSeverityLevel('success');
        log(LevelString.INFO, `connectedtest ${device_name}`);
      } else {
        if (diff >= 0 && diff < range.info) {
          setSeverityLevel('info');
          setDisconnectedMsg(
            `${t('devices.disconnectedMsg', { seconds: range.default })}`
          );
        } else if (diff >= range.info && diff < range.warning) {
          setSeverityLevel('warning');
          setDisconnectedMsg(
            `${t('devices.disconnectedMsg', { seconds: range.info })}`
          );
        } else if (diff >= range.warning) {
          setSeverityLevel('error');
          setDisconnectedMsg(
            `${t('devices.disconnectedMsg', { seconds: range.warning })}`
          );
        }
        log(LevelString.INFO, `not connectedtest ${device_name}: ${diff}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff]);

  return (
    <>
      <Grid xs={12} sm={6} md={4}>
        <AlertDisplay
          severity={severityLevel}
          sx={{ '& .MuiAlert-message': { width: '100%' } }}
          title={device_name}
        >
          <Box my={2}>
            <Typography variant="body2">
              <strong>{t('devices.connectedState')}:</strong> {connectionstate}{' '}
              {disconnectedMsg}
            </Typography>
            <Typography variant="body2">
              <strong>{t('devices.error')}:</strong>{' '}
              {error || t('devices.none')}
            </Typography>
            <Typography variant="body2">
              <strong>{t('devices.lastRecieved')}:</strong>{' '}
              {formatUTCDateWithSeconds(lastcmdmsgrcv, true)}
            </Typography>
            <Typography variant="body2">
              <strong>{t('devices.status')}:</strong>{' '}
              {status || t('devices.na')}
            </Typography>
            <Typography variant="body2">
              <strong>{t('devices.messagesReceived')}:</strong>{' '}
              {recv_msgs || t('devices.na')}
            </Typography>
            <Typography variant="body2">
              <strong>{t('devices.messagesSent')}:</strong>{' '}
              {sent_msgs || t('devices.na')}
            </Typography>
            <Box textAlign={'right'}>
              <Button
                onClick={() => {
                  disconnectSnackbar();
                  disconnectDevice();
                }}
                variant={'outlined'}
                disabled={disconnected && diff < range.warning}
              >
                <>
                  {diff < range.warning && <>{t('buttons.disconnect')}</>}
                  {diff >= range.warning && <>{t('devices.clickToForget')}</>}
                </>
              </Button>
            </Box>
          </Box>
        </AlertDisplay>
      </Grid>
    </>
  );
};

const ActiveDevices = () => {
  const { t } = useTranslation();
  const appState = useAppSelector((state: any) => state);
  const catalogMessage = get(appState, 'catalog.catalogMessage');
  const statusMessages = get(appState, 'messages.statusMessages');

  const deviceList = useMemo(() => {
    const deviceArray = statusMessages ? Object.entries(statusMessages) : [];
    const list: any[] = [];
    if (deviceArray && deviceArray.length > 0) {
      deviceArray.map((device) => list.push({ [`${device[0]}`]: device[1] }));
    }
    return list;
  }, [statusMessages]);

  const agentList = useMemo(() => {
    const agentArray = catalogMessage ? Object.entries(catalogMessage) : [];
    const dList: any[] = [];
    if (agentArray && agentArray.length > 0) {
      const list: any[] = [];
      agentArray.map((agent) =>
        list.push(get(agent, '[1].selected_device_list'))
      );
      if (list && list.length > 0) {
        list[0].forEach((device: { deviceAddress: string; stats: any }) => {
          dList.push({
            [`${device.deviceAddress}`]: {
              ...device.stats,
              agent: Object.keys(catalogMessage)[0],
            },
          });
        });
      }
    }
    return Object.assign({}, ...dList); // convert array into object
  }, [catalogMessage]);

  return (
    <Box>
      <TitleTypography title={t('activeDevices.title')} />
      <Grid container spacing={2} alignItems="stretch">
        <>
          {agentList &&
            deviceList.map((device) => {
              const deviceId = Object.keys(device)[0];

              // device not found in agentList
              if (!agentList[deviceId]) {
                return null;
              }

              // data from agentList
              const deviceObj = get(agentList, deviceId);
              const agentId = get(deviceObj, 'agent');

              return (
                <Device
                  key={deviceId}
                  agent={agentId}
                  device={device}
                  deviceId={deviceId}
                  deviceObj={deviceObj}
                />
              );
            })}
          {Object.keys(agentList).length < 1 && (
            <Typography variant="body2">
              {t('devices.listofAvailable')} {t('devices.na')}
            </Typography>
          )}
        </>
      </Grid>
    </Box>
  );
};

export default ActiveDevices;
