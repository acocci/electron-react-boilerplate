import '@testing-library/jest-dom';

import { server } from 'test/msw/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// general cleanup
afterEach(async () => {
  window.localStorage.clear();
});
