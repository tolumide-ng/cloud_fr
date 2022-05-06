import { Card } from 'components/Card';
import { CardContent } from 'components/Card/CardContent';
import { CardHead } from 'components/Card/CardHead';
import { CardSection } from 'components/Card/CardSection';
import { Server } from 'components/Server';
import React, { useMemo } from 'react';
import useServers from './useServers';
import { serverPageStles } from './styles';

export const ServersPage = () => {
  const { servers, fetchServers } = useServers();

  useMemo(async () => {
    await fetchServers();
  }, []);

  return (
    <Card>
      <style jsx>{serverPageStles}</style>
      <CardHead title="Servers" />
      <CardContent>
        {/* success and user has servers */}
        {servers.state === 'success' && servers.data?.length ? (
          <ul className="Servers__List">
            {servers.data.map(({ hostname, state, title, uuid }) => (
              <CardSection key={uuid}>
                <Server
                  hostName={hostname}
                  state={state}
                  title={title}
                  skeleton={false}
                />
              </CardSection>
            ))}
          </ul>
        ) : (
          <></>
        )}

        {/* success but user has no servers */}
        {servers?.state === 'success' && !servers.data?.length ? (
          <p>You do not have any servers at the moment</p>
        ) : (
          <></>
        )}

        {/* request failed */}
        {servers.state === 'failure' ? (
          <p className="">Something bad happened, please try again later</p>
        ) : (
          <></>
        )}

        {/* loading request */}
        {servers.state === 'loading' ? (
          <>
            {new Array(2).fill('_').map((_skeleton, index) => (
              <CardSection key={index} aria-label="loading">
                <Server hostName="" state={null} title="" skeleton />
              </CardSection>
            ))}
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};
