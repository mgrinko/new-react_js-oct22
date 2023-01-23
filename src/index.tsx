import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { TodosProvider } from './TodosContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <TodosProvider>
    <App />
  </TodosProvider>
);
