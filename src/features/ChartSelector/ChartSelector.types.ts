import { GenericRecords, NameValuePairs } from 'types/generic.types';

export interface IChartsSelector {
  chartOptions: NameValuePairs;
  data: GenericRecords;
}

export const MultipleChartOptions = {
  areaChart: 'Area Chart',
  barChart: 'Bar Chart',
  lineChart: 'Line Chart',
};

export const SingleCharts = {
  pieChart: 'Pie Chart',
};

export const SingleChartOptions = {
  ...MultipleChartOptions,
  ...SingleCharts,
};
