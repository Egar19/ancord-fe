import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
