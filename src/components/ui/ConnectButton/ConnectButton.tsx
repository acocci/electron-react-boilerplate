import { CircularIndicator } from '@CanineLizard/react-component-lib';
import { Box, Button } from '@mui/material';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConnectionContext } from 'context/ConnectionContext';
import { ConnectState } from 'helpers/devices';
import { AgentCMD } from 'libs/interface/api/connection';
import { useAppSelector } from 'store/hooks';

import {
  Severity,
  snackBarDefaults,
} from '../SnackbarDisplay/SnackbarDisplay.types';

import { CMD, ConnectionType, IConnectButton } from './ConnectButton.types';

function ConnectButton({
  address,
  agent,
  name = 'Device',
  variant = 'outlined',
}: IConnectButton) {
  const { t } = useTranslation();
  const statusMessage = useAppSelector(
    (state) => state.messages.statusMessages
  );
  const deviceState = get(
    statusMessage,
    `${address}.connectionstate`,
    ConnectState.Disconnected
  );
  const { connection } = useContext(ConnectionContext);
  const [updateConnection, setUpdateConnection] =
    useState<ConnectionType>(null);
  const connected = useMemo(
    () => String(deviceState) === ConnectState.Connected,
    [deviceState]
  );
  const { enqueueSnackbar } = useSnackbar();
  const useAgent = agent || 'e79aa753-4335-4750-9134-024ab08b05e0';

  const selectDevice = useCallback(() => {
    setUpdateConnection(CMD.Select);
    connection.sendCMD(AgentCMD.SelectDevice, useAgent, {
      deviceid: address,
      characteristics: ['00002A37-0000-1000-8000-00805F9B34FB'],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disconnectDevice = useCallback(() => {
    setUpdateConnection(CMD.Deselect);
    connection.sendCMD(AgentCMD.DisconnectDevice, useAgent, {
      deviceid: address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectDisconnect = useCallback(() => {
    if (!connected) selectDevice();
    else if (connected) disconnectDevice();
  }, [connected, disconnectDevice, selectDevice]);

  useEffect(() => {
    if (connected && updateConnection === CMD.Select) {
      setUpdateConnection(null);
      enqueueSnackbar(`${name} ${t('buttons.connected')}`, {
        ...snackBarDefaults,
        variant: Severity.success,
      });
    }

    if (!connected && updateConnection === CMD.Deselect) {
      setUpdateConnection(null);
      enqueueSnackbar(`${name} ${t('buttons.disconnected')}`, {
        ...snackBarDefaults,
        variant: Severity.error,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, updateConnection]);

  return (
    <Box>
      <Button
        onClick={connectDisconnect}
        variant={variant}
        disabled={updateConnection !== null}
      >
        {updateConnection && (
          <CircularIndicator progressBkg={false} size={26} />
        )}
        {!updateConnection && (
          <>
            {connected ? (
              <>{t('buttons.disconnect')}</>
            ) : (
              <>{t('buttons.connect')}</>
            )}
          </>
        )}
      </Button>
    </Box>
  );
}

export default ConnectButton;
