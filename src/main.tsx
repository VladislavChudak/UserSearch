import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './ErrorBoundary.tsx';
import NotFound from './NotFound.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={browserRouter} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
