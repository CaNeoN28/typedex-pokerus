import Page from 'components/Page';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Page>
      <AppRouter/>
    </Page>
  </React.StrictMode>
);