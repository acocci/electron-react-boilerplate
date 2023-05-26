import { GenericKVPair } from 'types/generic.types';

export function getStorage(key: string) {
  let ss = '';
  if (global.sessionStorage) {
    try {
      ss = sessionStorage.getItem(key) || '';
    } catch (e) {
      /* Ignore */
    }
  }
  return ss;
}

export function setStorageObject(key: string, value: string | number | GenericKVPair) {
  if (global.sessionStorage) {
    const str = JSON.stringify(value);
    return sessionStorage.setItem(key, str);
  }
  return '';
}

export function setStorageString(key: string, value: string) {
  if (global.sessionStorage) {
    return sessionStorage.setItem(key, value);
  }
  return '';
}

export function parseStorage(key: string) {
  const storage = getStorage(key);
  return storage ? JSON.parse(storage) : '';
}
