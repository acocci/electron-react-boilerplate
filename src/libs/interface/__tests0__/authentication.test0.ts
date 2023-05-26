/* eslint-disable jest/no-commented-out-tests */
import { LevelString, log } from 'helpers/logger';

import { defaultCredentials, login, logout } from '../authentication';
import { RequestError, TokenData } from '../data';
import { api } from '../networking';
import { refreshToken } from '../networking-internal';

// helper/mock functions BEGIN

function isTokenData(data: unknown): boolean {
  log(LevelString.INFO, 'isTokenData', data);
  return (
    data instanceof Object &&
    Object.hasOwn(data, 'access_token') &&
    Object.hasOwn(data, 'expires_in') &&
    Object.hasOwn(data, 'not-before-policy') &&
    Object.hasOwn(data, 'refresh_expires_in') &&
    Object.hasOwn(data, 'refresh_token') &&
    Object.hasOwn(data, 'scope') &&
    Object.hasOwn(data, 'session_state') &&
    Object.hasOwn(data, 'token_type')
  );
}
// helper/mock functions END

// tests BEGIN

let tokenData: TokenData;

test('login returns token', async () => {
  expect.assertions(1);
  try {
    const result = await login(defaultCredentials.service);
    if (!Object.values(RequestError).includes(result as RequestError))
      tokenData = result as TokenData;
    log(LevelString.INFO, 'TokenData', result);
    expect(isTokenData(result)).toBe(true);
  } catch (err) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(err).toBe(true);
    log(LevelString.ERROR, 'Test failed: login', err);
  }
});

test('refresh token returns token', async () => {
  expect.assertions(1);
  try {
    const result = await refreshToken(api, tokenData);
    if (!Object.values(RequestError).includes(result as RequestError))
      tokenData = result as TokenData;
    expect(isTokenData(result)).toBe(true);
  } catch (err) {
    // eslint-disable-next-line jest/no-conditional-expect
    // expect(err).toBe(true);
    log(LevelString.ERROR, 'Test failed: refresh', err);
  }
});

test('logout after login returns true', async () => {
  expect.assertions(1);
  try {
    const result = await logout(tokenData);
    expect(result).toBe(true);
  } catch (err) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(err).toBe(true);
    log(LevelString.ERROR, 'Test failed: logout 1', err);
  }
});

// test('logout after logout returns false', async () => {
//   expect.assertions(1);
//   try {
//     const result = await logout(tokenData);
//     expect(result).toBe(false);
//   } catch (err) {
//     // eslint-disable-next-line jest/no-conditional-expect
//     expect(err).toBe(true);
//     console.log('Test failed: login', err);
//   }
// });
