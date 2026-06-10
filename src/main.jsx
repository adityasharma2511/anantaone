import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { EnquiryModalProvider } from '@/context/EnquiryModalProvider';
import '@/styles/globals.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EnquiryModalProvider>
      <App />
    </EnquiryModalProvider>
  </StrictMode>,
);
