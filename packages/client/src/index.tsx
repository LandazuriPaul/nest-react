import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { APP_ROOT } from '~/config';
import { App } from '~/components/App';

import './index.css';

const container = document.getElementById(APP_ROOT);
const root = createRoot(container!);

function ReactApp(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  );
}

root.render(<ReactApp />);
