export interface IServer {
  hostname: string;
  state: TServerState;
  title: string;
  uuid: string;
}

export type TServerState = 'started' | 'stopped' | 'error' | 'maintenance';

export type TAppState = 'rest' | 'loading' | 'success' | 'failure';

export interface IStorage {
  size: number;
  title: string;
  type: 'backup' | 'normal' | 'template';
  uuid: string;
}
