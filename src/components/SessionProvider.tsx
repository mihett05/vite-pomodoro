import React, { createContext } from 'react';
import { Session } from '../db';

interface ISessionContext {
  uid: string;
  session: Session;
  isOwner: boolean;
}

export const SessionContext = createContext<ISessionContext>({} as ISessionContext);

interface SessionProviderProps {
  children: React.ReactNode;
  uid: string;
  session: Session;
  isOwner: boolean;
}

function SessionProvider({ uid, session, isOwner, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider
      value={{
        uid,
        session,
        isOwner,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
