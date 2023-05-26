/* eslint-disable global-require, @typescript-eslint/no-var-requires */

export const initMockServiceWorker = () => {
  if (window.electron.Env.isMswEnabled()) {
    const { worker } = require('./browser');
    worker.start();
  }
};
