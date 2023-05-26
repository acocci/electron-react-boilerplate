import React, { ReactNode } from 'react';

import { storedConnectionInfo } from 'libs/interface/api/broker-connection';
import { ApiConnection } from 'libs/interface/api/connection';
import {
  dataCatalogMessageHandler,
  statusMessageHandler,
} from 'libs/interface/api/message-handlers';

export interface IConnectionProps {
  children?: ReactNode;
}

const ConnectionContext = React.createContext<Record<string, ApiConnection>>({});

const ConnectionProvider = ({ children }: IConnectionProps) => {
  const connection = ApiConnection.getInstance(
    storedConnectionInfo(),
    statusMessageHandler,
    dataCatalogMessageHandler,
  );
  return <ConnectionContext.Provider value={{ connection }}>{children}</ConnectionContext.Provider>;
};

export { ConnectionContext, ConnectionProvider };
