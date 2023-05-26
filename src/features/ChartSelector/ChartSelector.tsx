import {
  AreaChart,
  BarGraph,
  DropDown,
  LineChart,
  PieChart,
} from '@CanineLizard/react-component-lib';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GenericRecord } from 'types/generic.types';

import { IChartsSelector } from './ChartSelector.types';

const ChartSelector = ({ chartOptions, data }: IChartsSelector) => {
  const { t } = useTranslation();
  const [selectedChart, setSelectedChart] = useState<string>('');

  const displaySelectedChart = useCallback(() => {
    const CHART: GenericRecord = {
      areaChart: <AreaChart data={data} />,
      barChart: <BarGraph data={data} />,
      lineChart: <LineChart data={data} />,
      pieChart: <PieChart data={data} />,
    };
    return CHART[selectedChart];
  }, [data, selectedChart]);

  return (
    <>
      <DropDown
        dropDownLabel={t('charts.charts')}
        onChangeCallback={event => {
          setSelectedChart(event.target.value);
        }}
        selectOption={chartOptions}
        sx={{ marginBottom: 3 }}
      />
      {selectedChart && displaySelectedChart()}
    </>
  );
};

export default ChartSelector;
