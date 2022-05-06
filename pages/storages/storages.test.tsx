import React from 'react';
import { render } from '@testing-library/react';
import * as useStoragesModule from './useStorages';
import { StoragesPage } from './storages';

describe('Storages Page', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  const mockHook = (mockFetchStorages, state, data = null) =>
    jest.spyOn(useStoragesModule, 'default').mockImplementation(() => ({
      fetchStorages: mockFetchStorages,
      storages: { state, data },
    }));

  test('should render skeleton when the page is first mounted', async () => {
    const mockFetchStorages = jest.fn();
    mockHook(mockFetchStorages, 'loading');

    expect(mockFetchStorages).toHaveBeenCalledTimes(0);

    const { getByTestId, getByRole, queryByText } = render(<StoragesPage />);

    const page = getByTestId('card');
    const list = getByRole('list');

    expect(page).toBeTruthy();
    expect(list).toBeTruthy();
    expect(list).toHaveClass('Dummy');
    expect(mockFetchStorages).toHaveBeenCalledTimes(1);
    expect(queryByText('GB')).not.toBeInTheDocument();
  });

  test('should render empty message when the data is fetched and empty', async () => {
    const mockFetchStorages = jest.fn();
    mockHook(mockFetchStorages, 'success', []);

    expect(mockFetchStorages).toHaveBeenCalledTimes(0);

    const { getByTestId, queryByRole, getByText } = render(<StoragesPage />);

    const page = getByTestId('card');
    const list = queryByRole('list');
    const listItems = queryByRole('listitem');

    expect(page).toBeTruthy();
    expect(list).toBeFalsy();
    expect(listItems).toBeFalsy();
    expect(
      getByText('You do not have any storage at the moment'),
    ).toBeInTheDocument();
    expect(mockFetchStorages).toHaveBeenCalledTimes(1);
  });

  test('should render error message when the data is fetched and empty', async () => {
    const mockFetchStorages = jest.fn();
    mockHook(mockFetchStorages, 'failure');

    expect(mockFetchStorages).toHaveBeenCalledTimes(0);

    const { getByTestId, queryByRole, queryByText, getByText } = render(
      <StoragesPage />,
    );

    const page = getByTestId('card');
    const list = queryByRole('list');
    const listItems = queryByRole('listitem');

    expect(page).toBeTruthy();
    expect(list).toBeFalsy();
    expect(listItems).toBeFalsy();
    expect(
      getByText('Something bas happened, please try again later'),
    ).toBeTruthy();
    expect(
      queryByText('You do not have any storage at the moment'),
    ).not.toBeInTheDocument();
    expect(mockFetchStorages).toHaveBeenCalledTimes(1);
  });

  test('shoudl redner the storages when they are present', async () => {
    const mockFetchStorages = jest.fn();
    const storageOne = {
      size: 126,
      title: 'Neon Users',
      type: 'normal',
      uuid: 'uuid',
    };
    mockHook(mockFetchStorages, 'success', [storageOne]);

    expect(mockFetchStorages).toHaveBeenCalledTimes(0);

    const { getByTestId, getByRole, getAllByRole, queryByText, getByText } =
      render(<StoragesPage />);

    const page = getByTestId('card');
    const pageTitle = getByText('Storages');
    const list = getByRole('list');
    const listItems = getAllByRole('listitem');

    expect(page).toBeTruthy();
    expect(pageTitle).toBeTruthy();
    expect(list).toBeTruthy();
    expect(list).toHaveAttribute('role');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent(`${storageOne.size}GB`);
    expect(
      queryByText('Something bas happened, please try again later'),
    ).toBeFalsy();
    expect(
      queryByText('You do not have any storage at the moment'),
    ).not.toBeInTheDocument();
    expect(mockFetchStorages).toHaveBeenCalledTimes(1);
  });
});
