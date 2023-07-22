import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </App>
  </React.StrictMode>
);
