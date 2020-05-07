import React, { Suspense } from 'react';
import { render } from 'react-dom';

import { App } from '~/components/App';
import { APP_ROOT } from '~/config';

const rootElement = document.getElementById(APP_ROOT);

function ReactApp(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  );
}

render(<ReactApp />, rootElement);
