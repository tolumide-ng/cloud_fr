import { request } from 'api/apiClient';
import React, { useState } from 'react';
import { IServer } from 'upcloud';

interface IState {
  state: 'rest' | 'loading' | 'success' | 'failure';
  data: ReadonlyArray<IServer> | null;
}

const useServers = () => {
  const [servers, setServers] = useState<IState>({
    state: 'rest',
    data: [],
  });

  const fetchServers = async () => {
    setServers({ state: 'loading', data: null });
    try {
      const response = await request({ method: 'get', url: '/server' });
      setServers({ state: 'success', data: response.data.servers.server });
    } catch (error) {
      setServers({ state: 'success', data: null });
    }
  };

  return {
    servers,
    fetchServers,
  };
};

export default useServers;
