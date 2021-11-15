import React from 'react';
import { Box, Center, CircularProgress, CircularProgressLabel, Heading } from '@chakra-ui/react';
import { Session } from '../db';
import PomodoroControls from './PomodoroControls';
import usePomodoroTimer from '../hooks/usePomodoroTimer';

interface PomodoroProps {
  uid: string;
  session: Session;
  isOwner: boolean;
}

function Pomodoro({ uid, session, isOwner }: PomodoroProps) {
  const { state } = session;
  const { date, progress } = usePomodoroTimer(session, isOwner);

  return (
    <Box
      style={{
        padding: '10vw',
        width: '70vw',
      }}
    >
      <Center>
        <Heading>{state[0].toUpperCase() + state.slice(1)}</Heading>
      </Center>
      <Center>
        <CircularProgress value={progress} size="4em" color={state === 'session' ? 'cyan.400' : 'teal.400'}>
          <CircularProgressLabel>
            <Heading>{date}</Heading>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
      <PomodoroControls uid={uid} session={session} isOwner={isOwner} />
    </Box>
  );
}

export default Pomodoro;
