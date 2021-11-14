import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { onValue, query, ref } from 'firebase/database';

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

  if (isLoading) {
    return <>Loading</>;
  }

  if (!userId || !session) {
    return <>Session not found</>;
  }

  const isOwner = auth.currentUser?.uid === userId;

  return <Pomodoro session={session} isOwner={isOwner} />;
}

export default SessionPage;
