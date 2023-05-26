import { getStorage, parseStorage, setStorageObject, setStorageString } from 'helpers/storage';

const key = 'ss_test';
const obj = { name: { first: 'Darth', last: 'Vader' } };
const objStringified = JSON.stringify(obj);

describe('Generate Name/Value Pairs', () => {
  beforeEach(() => {
    window.sessionStorage.removeItem(key);
  });

  it('getStorage should return session storage', () => {
    window.sessionStorage.setItem(key, objStringified);
    expect(getStorage(key)).toEqual(objStringified);
  });

  it('parseStorage should return session storage', () => {
    window.sessionStorage.setItem(key, objStringified);
    expect(parseStorage(key)).toEqual(obj);
  });

  it('setStorageObject should set session storage object', () => {
    setStorageObject(key, obj);
    const ss = window.sessionStorage.getItem(key);
    expect(ss).toEqual(objStringified);
  });

  it('setStorageString should set session storage string', () => {
    setStorageString(key, objStringified);
    const ss = window.sessionStorage.getItem(key);
    expect(ss).toEqual(objStringified);
  });
});
