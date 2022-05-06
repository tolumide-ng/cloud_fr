import { request } from 'api/apiClient';
import React, { useState } from 'react';
import { IServer, TAppState } from 'upcloud';

interface IState {
  state: TAppState;
  data: ReadonlyArray<IServer> | null;
}

const useServers = () => {
  const [servers, setServers] = useState<IState>({
    state: 'rest',
    data: null,
  });

  const fetchServers = async () => {
    setServers({ state: 'loading', data: null });
    try {
      const response = await request({ method: 'get', url: '/server' });
      setServers({ state: 'success', data: response.data.servers.server });
    } catch (error) {
      setServers({ state: 'failure', data: null });
    }
  };

  return {
    servers,
    fetchServers,
  };
};

export default useServers;
