/**
 * Environment variables
 */
export const Env = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  MSW_ENABLED: process.env.REACT_APP_MSW_ENABLED,
  NODE_ENV: process.env.NODE_ENV,

  isDev() {
    return this.NODE_ENV === 'development';
  },
  isMswEnabled() {
    return this.MSW_ENABLED === 'true';
  },
  isProd() {
    return this.NODE_ENV === 'production';
  },
  isTest() {
    return this.NODE_ENV === 'test';
  },
};

export default Env;
