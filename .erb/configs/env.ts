export const envDefault = {
  API_BASE_URL: 'http://localhost:8000',
  DEBUG_PROD: false,
  NODE_ENV: 'production',
  START_MINIMIZED: false,
};

export const envDevDefault = Object.assign(envDefault, {
  API_BASE_URL: 'http://localhost:8000',
  MSW_ENABLED: true,
  NODE_ENV: 'development',
});
