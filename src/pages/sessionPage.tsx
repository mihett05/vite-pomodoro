import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { onValue, query, ref, onDisconnect } from 'firebase/database';
import { Center } from '@chakra-ui/react';

import { db, auth } from '../firebase';
import { Session } from '../db';
import Pomodoro from '../components/Pomodoro';

function SessionPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    return <>Loading</>;
  }

  if (!userId || !session) {
    return <>Session not found</>;
  }

  const isOwner = auth.currentUser?.uid === userId;

  return (
    <Center h="90vh">
      <Pomodoro session={session} isOwner={isOwner} />
    </Center>
  );
}

export default SessionPage;
