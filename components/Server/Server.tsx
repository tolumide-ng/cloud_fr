import React from 'react';
import { TServerState } from 'upcloud';
import { serverStyles, serverSkeletonStyles } from './styles';

interface IProps {
  hostName: string;
  state?: TServerState;
  title: string;
  skeleton: boolean;
}

export const Server = ({ hostName, state, title, skeleton }: IProps) => {
  const status = {
    started: 'Started',
    stopped: 'Stopped',
  };

  const statusClass = ((state: string) => {
    let name = 'Server__';
    status[state] ? (name += status[state]) : (name += 'Others');
    return name;
  })(state);

  return (
    <div
      className={`Server ${skeleton ? 'Dummy' : ''}`}
      data-testid="server-row"
    >
      <style jsx>{serverStyles}</style>
      <style jsx>{serverSkeletonStyles}</style>

      <div className={`Server__Status`}>
        <div
          role="status"
          className={`Server__Indicator ${statusClass}`}
          aria-label={state}
        ></div>
      </div>
      <div className="Server__Info">
        <p>{title}</p>
        <p>Hostname: {hostName}</p>
      </div>
    </div>
  );
};
