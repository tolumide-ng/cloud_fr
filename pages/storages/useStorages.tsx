import { request } from 'api/apiClient';
import React, { useState } from 'react';
import { IStorage, TAppState } from 'upcloud';

interface IState {
  state: TAppState;
  data: ReadonlyArray<IStorage> | null;
}

const useStorages = () => {
  const [storages, setStorages] = useState<IState>({
    state: 'rest',
    data: null,
  });

  const fetchStorages = async () => {
    setStorages({ state: 'loading', data: null });
    try {
      const response = await request({ method: 'get', url: '/storage' });
      setStorages({ state: 'success', data: response.data.storages.storage });
    } catch (error) {
      setStorages({ state: 'failure', data: null });
    }
  };

  return {
    storages,
    fetchStorages,
  };
};

export default useStorages;
