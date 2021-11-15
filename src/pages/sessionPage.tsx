import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { onValue, query, ref, onDisconnect } from 'firebase/database';
import { Center, Heading } from '@chakra-ui/react';

import { db, auth } from '../firebase';
import { Session } from '../db';
import Pomodoro from '../components/Pomodoro';
import SessionProvider from '../components/SessionProvider';

function SessionPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      return onValue(query(ref(db, `sessions/${userId}`)), (data) => {
        setSession(data.val());
        setIsLoading(false);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (session && userId && userId === auth.currentUser?.uid) {
      const onDisconnectSession = onDisconnect(ref(db, `sessions/${userId}`));
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
    return (
      <Center h="90vh">
        <Heading>Loading...</Heading>
      </Center>
    );
  }

  if (!userId || !session) {
    return <>Session not found</>;
  }

  const isOwner = auth.currentUser?.uid === userId;

  if (!isOwner && !session.isOnline) {
    return (
      <Center h="90vh">
        <Heading>Session is offline</Heading>
      </Center>
    );
  }

  return (
    <Center h="90vh">
      <SessionProvider uid={userId} session={session} isOwner={isOwner}>
        <Pomodoro />
      </SessionProvider>
    </Center>
  );
}

export default SessionPage;
