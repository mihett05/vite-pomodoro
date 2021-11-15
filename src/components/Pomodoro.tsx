import React, { useContext } from 'react';
import { Box, Center, CircularProgress, CircularProgressLabel, Heading } from '@chakra-ui/react';

import PomodoroControls from './PomodoroControls';
import usePomodoroTimer from '../hooks/usePomodoroTimer';
import { SessionContext } from './SessionProvider';

function Pomodoro() {
  const {
    session: { state },
  } = useContext(SessionContext);
  const { date, progress } = usePomodoroTimer();

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
      <PomodoroControls />
    </Box>
  );
}

export default Pomodoro;
