import { AxiosResponse } from 'axios';

import makeApi from '../../libs/core/configureAxios';
import { NetworkRequest, TokenData } from '../../libs/interface/data';

import { getRequest } from './networking-internal';

// TODO: correct urls
export const APIURL = (() => 'http://localhost:55600/v1')();
// if (Env.isDev()) return '0.0.0.0';
// if (Env.isTest()) return '0.0.0.0';
// if (Env.isProd()) return '0.0.0.0';
// else if (Env.isMswEnabled()) return '0.0.0.0'; // unsure if this should return a different url
// should we return a default url instead of throwing an error?
// throw Error('Invalid environment. Networking cannot be initialized');

// TODO: should not export this. temporary fix for refresh token test in authentication.test.ts
export const api = makeApi(APIURL);
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// TODO: limit request body to known data structures?
// TODO: add auth data to request. through headers or some other method?
// TODO: add body to request
export function authReq(
  request: NetworkRequest,
  authentication: TokenData
): Promise<AxiosResponse> {
  return getRequest(api)(request, authentication);
} // Return a function that executes a network request with CHP-IDA headers and current auth data

// NOTE: intended for use by login functionality. will not function for most endpoints
// TODO: limit request body to known data structures?
export function noAuthReq(request: NetworkRequest): Promise<AxiosResponse> {
  return getRequest(api)(request);
}
