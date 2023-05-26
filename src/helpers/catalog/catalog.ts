import { GenericRecord } from 'types/generic.types';

import { CatalogMessages } from './catalog.types';

export const formatCatalog = (catalogList: CatalogMessages): GenericRecord => {
  const catalogs = {};
  catalogList.map(item => {
    // destructuring assignment of item
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { available_device_list, selected_device_list, timestamp } = item;
    const catalog = {
      [`${item.agentId}`]: {
        available_device_list,
        selected_device_list,
        timestamp,
      },
    };
    return Object.assign(catalogs, catalog);
  });
  return catalogs;
};
