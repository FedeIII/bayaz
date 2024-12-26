import { createContext, useContext, useCallback } from 'react';
import { useStateValue } from '../hooks/useStore';

const PresentTabContext = createContext();
export const WINDOW_CHANNEL = 'currentImageWindow';

export default PresentTabContext;

export function PresentTabProvider({ children }) {
  const [presentTabData, setPresentTabData, deletePresentTabData] =
    useStateValue(WINDOW_CHANNEL);

  const showInPresentationWindow = useCallback(
    (type, title, img, partyId) => {
      if (!partyId) return null;

      const newTabData = {
        partyId,
        type,
        title,
        img,
        animationInactive: true,
      };

      if (!presentTabData) {
        const currentImageUrl = `/party/${partyId}/currentImage?type=${type}&title=${encodeURIComponent(
          title
        )}&img=${encodeURIComponent(img)}`;
        window.open(currentImageUrl, 'currentImage');
      }
      setPresentTabData(JSON.stringify(newTabData));
    },
    [presentTabData]
  );

  const contextValue = {
    presentTabData,
    setPresentTabData,
    deletePresentTabData,
    showInPresentationWindow,
  };

  return (
    <PresentTabContext.Provider value={contextValue}>
      {children}
    </PresentTabContext.Provider>
  );
}

export function usePresentTab() {
  const context = useContext(PresentTabContext);
  if (!context) {
    throw new Error('usePresentTab must be used within a PresentTabProvider');
  }
  return context;
}
