import React from 'react';
import { render } from '@testing-library/react';
import { ServersPage } from './servers';
import * as useServersModule from './useServers';

describe.only('Servers Page', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const mockHook = (mockFetchServers, state, data = null) =>
    jest.spyOn(useServersModule, 'default').mockImplementation(() => ({
      fetchServers: mockFetchServers,
      servers: { state, data },
    }));

  test('should render skeleton when the page is first mounted', async () => {
    const mockFetchServers = jest.fn();
    mockHook(mockFetchServers, 'loading');

    const { getAllByTestId, getByTestId, getByRole } = render(<ServersPage />);

    const page = getByTestId('card');
    const server = getAllByTestId('server-row');

    expect(page).toBeTruthy();
    expect(page).toHaveClass('Card');
    expect(server).toBeTruthy();
    expect(server).toHaveLength(2);
    expect(mockFetchServers).toHaveBeenCalledTimes(1);
  });

  test('should render empty message when the the data is fetched and empty', async () => {
    const mockFetchServers = jest.fn();
    mockHook(mockFetchServers, 'success', []);

    expect(mockFetchServers).toHaveBeenCalledTimes(0);

    const { getByText, getByTestId } = render(<ServersPage />);

    const page = getByTestId('card');

    expect(page).toBeTruthy();
    expect(page).toHaveClass('Card');
    expect(
      getByText('You do not have any servers at the moment'),
    ).toBeInTheDocument();
    expect(mockFetchServers).toHaveBeenCalledTimes(1);
  });

  test('should render failure message when the request fails', async () => {
    const mockFetchServers = jest.fn();
    mockHook(mockFetchServers, 'failure', []);

    expect(mockFetchServers).toHaveBeenCalledTimes(0);

    const { getByText, getByTestId } = render(<ServersPage />);

    const page = getByTestId('card');

    expect(page).toBeTruthy();
    expect(page).toHaveClass('Card');
    expect(
      getByText('Something bad happened, please try again later'),
    ).toBeInTheDocument();
    expect(mockFetchServers).toHaveBeenCalledTimes(1);
  });

  test('should render all the servers', async () => {
    const mockFetchServers = jest.fn();
    const serverOne = {
      hostname: 'Neon',
      state: 'stopped',
      title: 'Blacklist',
      uuid: 'uuid',
    };
    mockHook(mockFetchServers, 'success', [serverOne]);

    expect(mockFetchServers).toHaveBeenCalledTimes(0);

    const { getByText, getByTestId, getByRole } = render(<ServersPage />);

    const page = getByTestId('card');
    const status = getByRole('status');

    expect(page).toBeTruthy();
    expect(page).toHaveClass('Card');
    expect(getByText('Servers')).toBeInTheDocument();
    expect(mockFetchServers).toHaveBeenCalledTimes(1);
    expect(getByText(serverOne.title)).toBeInTheDocument();
    expect(getByText(`Hostname: ${serverOne.hostname}`)).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(status).toHaveAccessibleName();
    expect(status).toHaveAttribute('aria-label');
  });
});
