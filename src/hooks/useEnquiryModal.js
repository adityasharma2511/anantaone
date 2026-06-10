import { useContext } from 'react';
import { EnquiryModalContext } from '@/context/EnquiryModalProvider';

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);

  if (!context) {
    throw new Error('useEnquiryModal must be used within EnquiryModalProvider');
  }

  return context;
}
