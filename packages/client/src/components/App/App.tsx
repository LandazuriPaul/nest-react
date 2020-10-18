import React, { FC, useEffect, useState } from 'react';

import { Dictionary } from '@nest-react/domain';

import { API_URL } from '~/config';
import { Logger, checkServerVersion } from '~/utils';

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>('NO SERVER RESPONSE');

  useEffect(() => {
    async function fetchResponse(): Promise<void> {
      try {
        const res = await fetch(API_URL);
        const data = await res.text();
        setResponse(data);
      } catch (err) {
        Logger.error(err);
      }
    }

    fetchResponse();
  }, []);

  useEffect(() => {
    checkServerVersion();
  }, []);

  const dictExample: Dictionary<number> = {
    first: 1,
    second: 2,
  };
  return (
    <>
      <div>
        Here we use a <code>Dictionary&lt;number&gt;</code> interface from the{' '}
        <code>@nest-react/domain</code> package:
        <pre>{JSON.stringify(dictExample)}</pre>
      </div>
      <div>
        And here we get a response from the API:
        <br />
        <br />
        {response}
      </div>
    </>
  );
};
