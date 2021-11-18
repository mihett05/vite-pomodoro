import React, { createContext, useEffect, useState } from 'react';
import { onDisconnect, onValue } from 'firebase/database';
import { Heading } from '@chakra-ui/react';

import { auth } from '../firebase';
import { getSessionRef, Session } from '../database/sessions';

interface ISessionContext {
  uid: string;
  session: Session;
  isOwner: boolean;
}

export const SessionContext = createContext<ISessionContext>({} as ISessionContext);

interface SessionProviderProps {
  children: React.ReactNode;
  uid: string;
  isOwner: boolean;
}

function SessionProvider({ uid, isOwner, children }: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (uid) {
      return onValue(getSessionRef(uid), (data) => {
        setSession(data.val());
        setIsLoading(false);
      });
    }
  }, [uid]);

  useEffect(() => {
    if (session && uid && uid === auth.currentUser?.uid) {
      const onDisconnectSession = onDisconnect(getSessionRef(uid));
      let changes = {
        isPaused: true,
        lastTime: new Date().getTime(),
      };
      onDisconnectSession.update({
        ...(!session.isPaused ? changes : {}),
        isPaused: true,
        isOnline: false,
      });
      return () => {
        onDisconnectSession.cancel();
      };
    }
  }, [session]);

  if (isLoading) {
    return <Heading>Loading...</Heading>;
  }

  if (!session) {
    return <Heading>Session not found</Heading>;
  }

  if (!isOwner && !session.isOnline) {
    return <Heading>Session is offline</Heading>;
  }

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
