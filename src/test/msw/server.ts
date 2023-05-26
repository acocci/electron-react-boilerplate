import { setupServer } from 'msw/node';

import { handlers } from 'test/msw/handlers';
import { interfaceHandlers } from './interface-handlers';

export const server = setupServer(...handlers.concat(interfaceHandlers));
