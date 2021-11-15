import React, { createContext, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';

export const OffsetContext = createContext<number>(0);

interface OffsetProvider {
  children: React.ReactNode;
}

function OffsetProvider({ children }: OffsetProvider) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    return onValue(ref(db, '.info/serverTimeOffset'), (data) => {
      setOffset(data.val());
    });
  }, [setOffset]);
  return <OffsetContext.Provider value={offset}>{children}</OffsetContext.Provider>;
}

export default OffsetProvider;
