/* eslint-disable @typescript-eslint/no-explicit-any */

import { CircularIndicator } from '@CanineLizard/react-component-lib';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { get } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TitleTypography from 'libs/ui/components/TitleTypography';
import { useAppSelector } from 'store/hooks';

import AgentButton from './AgentButton';
import { StyledBox } from './catalogPage.styles';
import { AvailableDeviceList, SelectedDeviceList } from './DeviceList';

const CatalogPage = () => {
  const { t } = useTranslation();
  const appState = useAppSelector((state: any) => state);
  const catalogMessage = get(appState, 'catalog.catalogMessage');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [agentTimeOrig, setAgentTimeOrig] = useState<Record<string, unknown> | null>(null);

  // set & store original agent timestamps
  useEffect(() => {
    if (!agentTimeOrig) {
      const list: any[] = [];
      const agentArray = catalogMessage ? Object.entries(catalogMessage) : [];
      if (agentArray && agentArray.length > 0) {
        agentArray.map(agent => list.push({ [`${agent[0]}`]: get(agent, '[1].timestamp') }));
        const agentTime = Object.assign({}, ...list);
        setAgentTimeOrig(agentTime);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogMessage]);

  const agentList = useMemo(() => {
    const agentArray = catalogMessage ? Object.entries(catalogMessage) : [];
    const list: any[] = [];

    if (agentArray && agentArray.length > 0) {
      agentArray.map(agent => {
        // default to first found agent
        if (!selectedAgent) setSelectedAgent(agent[0]);
        return list.push({ [`${agent[0]}`]: agent[1] });
      });
    }
    return list.length > 0 ? list : null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogMessage]);

  const handleClick = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  return (
    <>
      <TitleTypography title={t('catalog.title')} />

      <Grid container rowSpacing={1} spacing={6}>
        {!agentList && (
          <Grid container spacing={2}>
            <Grid>
              <CircularIndicator thickness={4} size={50} />
            </Grid>
            <Grid xs>
              <Typography sx={{ display: 'flex', fontWeight: 600, fontSize: 16, lineHeight: 3 }}>
                {t('devices.searchForAgents')}
              </Typography>
            </Grid>
          </Grid>
        )}
        {agentList && (
          <>
            <Grid xs={4}>
              <>
                {agentList.map((agent: any) => {
                  const agentId = Object.keys(agent)[0];
                  const { timestamp } = agent[agentId];

                  return (
                    <Box key={agentId}>
                      <AgentButton
                        active={selectedAgent === agentId}
                        agentId={agentId}
                        agentTimeOrig={agentTimeOrig}
                        timestamp={timestamp}
                        handleClick={handleClick}
                      />
                    </Box>
                  );
                })}
              </>
            </Grid>
            <Grid xs={8}>
              <>
                {selectedAgent &&
                  agentList.map((agent: any) => {
                    const agentId = Object.keys(agent).join();
                    const { available_device_list, selected_device_list } = agent[agentId];
                    if (agentId === selectedAgent) {
                      return (
                        <StyledBox key={agentId}>
                          <Box mb={6}>
                            <Typography className="device-header" variant="h4">
                              {t('devices.listofSelected')}
                            </Typography>

                            {selected_device_list.length < 1 && <>No Devices Available</>}

                            {selected_device_list.map((device: any) => {
                              const { deviceAddress } = device;
                              return (
                                <Box key={deviceAddress}>
                                  <SelectedDeviceList data={device} agent={agentId} />
                                </Box>
                              );
                            })}
                          </Box>

                          <Box mb={6}>
                            <Typography className="device-header" variant="h4">
                              {t('devices.listofAvailable')}
                            </Typography>

                            {available_device_list.length < 1 && <>No Devices Available</>}

                            {available_device_list.map((device: any) => {
                              const { deviceAddress } = device;
                              return (
                                <Box key={deviceAddress}>
                                  <AvailableDeviceList data={device} agent={agentId} />
                                </Box>
                              );
                            })}
                          </Box>
                        </StyledBox>
                      );
                    }

                    return null;
                  })}
              </>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CatalogPage;
