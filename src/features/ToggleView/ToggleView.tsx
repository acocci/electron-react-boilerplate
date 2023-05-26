/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete, SortTable } from '@CanineLizard/react-component-lib';
import { Box, Button } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { escapeRegExp } from 'lodash';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dashboard } from 'components/ui';
import { isDashboard, isList } from 'helpers/toggleView';
import { LabelValuePairs, ReactEvent } from 'types/generic.types';

import { defaultDisplayType, DisplayOptions, IToggleView } from './ToggleView.types';

const ToggleView = ({
  autoCompleteProps,
  dashboardProps,
  displayType,
  onFilter,
  tableProps,
}: IToggleView) => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState<string>(displayType || defaultDisplayType);
  const [rows, setRows] = useState(tableProps.rows);
  const [components, setComponents] = useState(dashboardProps.components);

  const toggle = useCallback((type: string) => {
    if (isList(type)) {
      setDisplay(DisplayOptions.DASHBOARD);
    } else {
      setDisplay(DisplayOptions.LIST);
    }
  }, []);

  const onChange = (_e: ReactEvent, value: LabelValuePairs) => {
    if (value && value.length) {
      const newValue = value;
      const regX = new RegExp(
        newValue.map((x: { value: string }) => escapeRegExp(x.value)).join('|'),
        'gi',
      );

      if (onFilter) onFilter(regX);

      setComponents(
        dashboardProps.components
          .map((component: any) => component.id.match(regX) && component)
          .filter(Boolean),
      );
      setRows(tableProps.rows.map((row: any) => row.id.match(regX) && row).filter(Boolean));
    } else {
      setComponents(dashboardProps.components);
      setRows(tableProps.rows);
    }
  };

  return (
    <>
      <Grid container>
        <Grid xs>
          <Box mb={2}>
            <Button onClick={() => toggle(display)} variant="contained">
              {t('buttons.toggleDisplay')}
            </Button>
          </Box>
        </Grid>
        {autoCompleteProps?.options && (
          <Grid xs>
            <Box mb={2}>
              <AutoComplete
                label={autoCompleteProps?.label || ''}
                options={autoCompleteProps?.options}
                onChange={(e: ReactEvent, value: any) => {
                  onChange(e, value);
                  if (autoCompleteProps?.onChange) {
                    autoCompleteProps.onChange(e, value);
                  }
                }}
                multiple={autoCompleteProps?.multiple}
                size={autoCompleteProps?.size}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {isList(display) && tableProps && <SortTable columns={tableProps.columns} rows={rows} />}
      {isDashboard(display) && <Dashboard {...dashboardProps} components={components} />}
    </>
  );
};

export default ToggleView;
