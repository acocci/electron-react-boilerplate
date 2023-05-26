/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ConnectionContext } from 'context/ConnectionContext';
import { allAvailableDevices, defaultAvailableDevices } from 'helpers/devices';
import { LevelString, log } from 'helpers/logger';
import { getQspParam } from 'helpers/qsp';
import { AgentCMD } from 'libs/interface/api/connection';
import { handleAvailableDevices } from 'libs/interface/api/message-handlers';
import { useAppSelector } from 'store/hooks';

export const useAvailableDevices = () => {
  const { connection } = useContext(ConnectionContext);
  const { availableDevices } = useAppSelector(state => state.devices);
  const [results, setResults] = useState<any>(availableDevices);
  const [loading, setLoading] = useState<boolean | null>(true);

  const all = getQspParam('all');
  const availableDeviceParams = all ? allAvailableDevices : defaultAvailableDevices;
  log(LevelString.INFO, 'fetch device params', JSON.stringify(availableDeviceParams));

  useMemo(() => {
    if (Object.keys(availableDevices).length) {
      setResults(availableDevices);
      setLoading(false);
    }
    return null;
  }, [availableDevices]);

  const fetchAvailableDevices = useCallback(() => {
    try {
      setLoading(true);
      connection.sendCMD(
        AgentCMD.ListAvailableDevices,
        'e79aa753-4335-4750-9134-024ab08b05e0',
        availableDeviceParams,
        handleAvailableDevices,
      );
    } catch (error) {
      setLoading(null);
    }
  }, [availableDeviceParams, connection]);

  useEffect(() => {
    fetchAvailableDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [results, loading];
};
