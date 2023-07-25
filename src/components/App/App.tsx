import React from 'react';
import './App.css';

export function App({ children }: {
  children: React.ReactNode
}) {
  return (
    <div
      className="app">
      { children }
    </div>
  );
}
