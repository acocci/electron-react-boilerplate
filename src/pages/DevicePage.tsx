/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularIndicator, Columns } from '@CanineLizard/react-component-lib';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { escapeRegExp } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GenericRecord,
  LabelValuePairs,
  StrNumNode,
} from 'types/generic.types';
import { ConnectButton, DeviceDisplay } from '../components/ui';
import { ComponentArray } from '../components/ui/ComponentById/ComponentById.types';
import {
  DashboardType,
  Keys,
  RequiredLayout,
  allRoles,
} from '../components/ui/Dashboard/Dashboard.types';
import ToggleView from '../features/ToggleView/ToggleView';
import {
  DeviceList,
  deviceWhiteListRegEx,
  formatLayout,
  formatRows,
  getDeviceNames,
} from '../helpers/devices';
import { generateLabelValuePairs } from '../helpers/options';
import { useAvailableDevices } from '../hooks/useAvailableDevices';
import TitleTypography from '../libs/ui/components/TitleTypography';

function DevicePage() {
  const numCol = 2;
  const { t } = useTranslation();
  const [results, loading] = useAvailableDevices();
  const [counter, setCounter] = useState<number>(30);
  const expired = useMemo(() => counter === 0, [counter]);
  const hasResults = useMemo(() => Object.keys(results).length > 0, [results]);

  useEffect(() => {
    window.setTimeout(() => {
      if (counter > 0 && !hasResults) {
        setCounter(counter - 1);
      }
    }, 1000);
  }, [counter, hasResults]);

  const componentList = (deviceList: DeviceList) => {
    const components: ComponentArray = [];

    deviceList.map((device) => {
      const { availableCharacteristics, deviceAddress, deviceName, RSSI } =
        device;
      components.push({
        id: device.deviceName,
        Comp: () => (
          <DeviceDisplay
            availableCharacteristics={availableCharacteristics}
            deviceAddress={deviceAddress}
            deviceName={deviceName}
            RSSI={RSSI}
          >
            <ConnectButton address={deviceAddress} name={deviceName} />
          </DeviceDisplay>
        ),
      });
      return device;
    });
    return components;
  };

  function ToggleComponent() {
    // const [filterdResults, setFilteredResults] = useState(results);
    const components = componentList(results);
    const layout = formatLayout(getDeviceNames(results), numCol);
    const rows = formatRows(results);

    // TODO: May remove onFilter

    // const onFilter = useCallback(
    //   (regEx: RegExp) => {
    //     const filtered = filterdResults
    //       .map((result: { deviceName: string }) => {
    //         if (result.deviceName.match(regEx)) {
    //           return result;
    //         }
    //         return result;
    //       })
    //       .filter(Boolean);
    //     setFilteredResults({ ...filterdResults, filtered });
    //   },
    //   [filterdResults],
    // );

    // autocomplete options
    const devices: LabelValuePairs = generateLabelValuePairs(
      getDeviceNames(results)
    );

    const columns: Columns = [
      { id: 'device', label: t('devices.device') },
      {
        align: 'center',
        id: 'RSSI',
        label: t('devices.bluetoothStrength'),
        format: (value?: StrNumNode) => {
          const newValue = 100 + Number(value);
          return (
            <>
              {value && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularIndicator
                    value={newValue}
                    tooltip={`${t('devices.signalStrength')}: RSSI ${value}`}
                  />
                </Box>
              )}
            </>
          );
        },
      },
      { id: 'address', label: t('devices.deviceId'), disableSorting: true },
      {
        id: 'characteristics',
        label: t('devices.characteristics'),
        format: (value?: StrNumNode) => value || t('devices.na'),
        disableSorting: true,
      },
      {
        id: 'connection',
        label: t('devices.connection'),
        format: (value?: StrNumNode, index?: number, row?: GenericRecord) => {
          const regX = new RegExp(
            deviceWhiteListRegEx
              .map((x: string) => escapeRegExp(String(x)))
              .join('|'),
            'gi'
          );
          const isMatch = !!(
            value &&
            typeof value === 'string' &&
            value.match(regX)
          );
          return (
            <>
              {value && isMatch && row && row.address && (
                <Box>
                  <ConnectButton
                    address={String(row.address)}
                    name={String(row.device)}
                  />
                </Box>
              )}
            </>
          );
        },
        disableSorting: true,
      },
    ];
    return (
      <ToggleView
        autoCompleteProps={{
          label: t('devices.autoCompleteLabel'),
          options: devices,
          multiple: true,
          size: 'medium',
        }}
        dashboardProps={{
          cols: {
            [Keys.LG]: numCol,
            [Keys.MD]: numCol,
            [Keys.SM]: numCol,
          },
          components,
          disableSave: true,
          editable: true,
          layouts: {
            [RequiredLayout]: layout,
          },
          roles: allRoles,
          rowHeight: 280,
          type: DashboardType.EVA,
        }}
        // onFilter={onFilter}
        tableProps={{
          columns,
          rows,
        }}
      />
    );
  }

  return (
    <Box>
      <TitleTypography title={t('devices.title')} />
      {loading && !expired && (
        <Grid container alignItems="center">
          <Grid>
            <CircularIndicator
              thickness={4}
              size={50}
              ico={<BluetoothIcon />}
            />
          </Grid>
          <Grid xs>
            <Typography variant="body2" sx={{ fontWeight: 600, marginLeft: 2 }}>
              {t('devices.searchForDevices')}
              {counter <= 5 && <> {t('devices.willTimeout', { counter })} </>}
            </Typography>
          </Grid>
        </Grid>
      )}
      {!loading && results && hasResults && <ToggleComponent />}
      {expired && (
        <Button onClick={() => window.location.reload()} variant="contained">
          {t('buttons.reload')}
        </Button>
      )}
    </Box>
  );
}

export default DevicePage;
