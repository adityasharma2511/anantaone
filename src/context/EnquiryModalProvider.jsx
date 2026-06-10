import { createContext, useCallback, useMemo, useState } from 'react';
import { EnquiryModal } from '@/components/ui/EnquiryModal';

const EnquiryModalContext = createContext(null);

export function EnquiryModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen, openModal, closeModal],
  );

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      <EnquiryModal />
    </EnquiryModalContext.Provider>
  );
}

export { EnquiryModalContext };
