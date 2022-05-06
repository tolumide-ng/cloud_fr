import React from 'react';
import { render } from '@testing-library/react';
import { Server } from './Server';

describe('Server Component', () => {
  const props = {
    skeleton: false,
    hostName: 'the Hostname',
    title: 'title',
    state: 'started',
  };

  test('Should display the skeleton when skeleton is true', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <Server hostName="" title="" state={null} skeleton />,
    );
    const element = getByTestId('server-row');
    const text = getByText('Hostname:');
    const status = getByRole('status');

    expect(element).toBeTruthy();
    expect(element).toHaveClass('Server Dummy');
    expect(element).not.toHaveFocus();
    expect(text).toBeInTheDocument();
    expect(status).toHaveClass('Server__Others');
  });

  test('Should display the server information when information is provided', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <Server {...props} state="started" />,
    );

    const element = getByTestId('server-row');
    const status = getByRole('status');

    expect(element).toBeTruthy();
    expect(element).not.toHaveClass('Dummy');
    expect(getByText('Hostname: the Hostname')).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass('Server__Started');
  });
});
