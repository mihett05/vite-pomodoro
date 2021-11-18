import React from 'react';
import { useParams } from 'react-router';
import { Center } from '@chakra-ui/react';

import { auth } from '../firebase';

import Pomodoro from '../components/Pomodoro';
import SessionProvider from '../contexts/SessionProvider';
import Room from '../components/Room';

function SessionPage() {
  const { userId } = useParams();
  const isOwner = auth.currentUser?.uid === userId;

  if (!userId) {
    return <>Session not found</>;
  }

  return (
    <Center h="90vh">
      <SessionProvider uid={userId} isOwner={isOwner}>
        <Room>
          <Pomodoro />
        </Room>
      </SessionProvider>
    </Center>
  );
}

export default SessionPage;
