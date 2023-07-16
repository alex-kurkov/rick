import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);