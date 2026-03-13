import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

interface BrandingContextType {
  logoUrl: string | null;
  mascotUrl: string | null;
  loading: boolean;
}

const BrandingContext = createContext<BrandingContextType>({
  logoUrl: null,
  mascotUrl: null,
  loading: true,
});

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [mascotUrl, setMascotUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'global'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLogoUrl(data.logoUrl || null);
        setMascotUrl(data.mascotUrl || null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching branding:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrandingContext.Provider value={{ logoUrl, mascotUrl, loading }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => useContext(BrandingContext);
