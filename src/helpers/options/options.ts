import { orderBy } from 'lodash';

import { GenericRecord, LabelValuePairs, NameValuePairs } from 'types/generic.types';

export const generateNameValuePairs = (pairs: GenericRecord): NameValuePairs => {
  const list: NameValuePairs = [];
  Object.entries(pairs).forEach(([key, value]) => {
    list.push({ name: String(value), value: String(key) });
  });
  const ordered = orderBy(list, ['value'], ['asc']);
  return ordered;
};

export const generateLabelValuePairs = (arr: Array<string> | Array<unknown>): LabelValuePairs => {
  const list: LabelValuePairs = [];
  arr.map(item =>
    list.push({ label: String(item), value: String(item).toLocaleLowerCase('en-US') }),
  );
  const ordered = orderBy(list, ['value'], ['asc']);
  return ordered;
};
