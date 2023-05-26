import { GenericArray, GenericRecord } from 'types/generic.types';

export const encodeURIPairs = (Pairs: GenericRecord) => {
  const formBody: GenericArray = [];
  Object.entries(Pairs).forEach(([key, value]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(String(value));
    formBody.push(`${encodedKey}=${encodedValue}`);
  });

  return formBody.join('&');
};

export const decodeURIPairs = (Pairs: string) => Object.fromEntries(new URLSearchParams(Pairs));
