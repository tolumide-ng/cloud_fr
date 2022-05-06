import { Card } from 'components/Card';
import { CardContent } from 'components/Card/CardContent';
import { CardHead } from 'components/Card/CardHead';
import React, { useMemo } from 'react';
import useStorages from './useStorages';
import { storagePageStyles } from './styles';

export const StoragesPage = () => {
  const { storages, fetchStorages } = useStorages();

  useMemo(async () => {
    await fetchStorages();
  }, []);

  return (
    <Card>
      <style jsx>{storagePageStyles}</style>
      <CardHead title="Storages"></CardHead>

      <CardContent>
        {storages.state === 'success' && storages.data?.length ? (
          <ul role="list">
            {storages.data.map(({ size, title, uuid }) => (
              <li key={uuid} tabIndex={0} role="listitem">
                {title} <span className="Storages__Size">({size}GB)</span>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}

        {storages.state === 'success' && !storages.data?.length ? (
          <p>You do not have any storage at the moment</p>
        ) : (
          <></>
        )}

        {storages.state === 'failure' ? (
          <p>Something bas happened, please try again later</p>
        ) : (
          <></>
        )}

        {storages.state === 'loading' ? (
          <ul className="Dummy" role="list">
            {new Array(3).fill('_').map((_storage, index) => (
              <li key={index} className="" role="listitem"></li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};
