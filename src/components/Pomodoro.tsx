import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import { FaPause, FaPlay } from 'react-icons/fa';
import { Session, editSession } from '../db';
import TimeInput from './TimeInput';

interface PomodoroProps {
  session: Session;
  isOwner: boolean;
}

function Pomodoro({ session, isOwner }: PomodoroProps) {
  const { isPaused, lastTime, endTime, state, sessionLength, breakLength } = session;
  const [clientLastTime, setClientLastTime] = useState(lastTime);
  const onTogglePause = () => {
    if (isPaused) {
      return editSession({
        isPaused: false,
        endTime: endTime + (new Date().getTime() - lastTime), // adding the time of the pause to the end time
        lastTime: new Date().getTime(),
      });
    } else {
      return editSession({
        isPaused: true,
        lastTime: new Date().getTime(),
      });
    }
  };

  const onReset = () =>
    editSession({
      isPaused: true,
      lastTime: new Date().getTime(),
      endTime: new Date().getTime() + sessionLength * 60 * 1000,
      state: 'session',
    });

  const onEditSessionLength = (value: number) =>
    editSession({
      sessionLength: value,
    });

  const onEditBreakLength = (value: number) =>
    editSession({
      breakLength: value,
    });

  useEffect(() => {
    setClientLastTime(lastTime);
    if (!isPaused) {
      const interval = setInterval(() => {
        setClientLastTime(new Date().getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, lastTime]);

  const remainingTime = Math.floor((endTime - clientLastTime) / 1000);

  useEffect(() => {
    if (remainingTime <= 0) {
      const newState = state === 'session' ? 'break' : 'session';
      editSession({
        state: newState,
        lastTime: new Date().getTime(),
        endTime: new Date().getTime() + (newState === 'session' ? sessionLength : breakLength) * 60 * 1000,
      });
    }
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime - minutes * 60;
  const formattedDate = [minutes, seconds].map((v) => (v < 10 ? `0${v}` : v)).join(':');

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
        <CircularProgress
          value={(1 - remainingTime / ((state === 'session' ? sessionLength : breakLength) * 60)) * 100}
          size="4em"
        >
          <CircularProgressLabel>
            <Heading>{formattedDate}</Heading>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
      <Center>
        <Flex>
          <IconButton
            aria-label="Pause/Resume"
            icon={isPaused ? <FaPlay /> : <FaPause />}
            onClick={onTogglePause}
            isDisabled={!isOwner}
            mr="4"
          />
          <IconButton aria-label="Reset" icon={<RepeatClockIcon />} onClick={onReset} isDisabled={!isOwner} />
        </Flex>
      </Center>
      <Flex>
        <TimeInput
          name="Session length(min)"
          value={sessionLength}
          onChange={onEditSessionLength}
          isDisabled={!isOwner}
        />
        <Spacer />
        <TimeInput name="Break length(min)" value={breakLength} onChange={onEditBreakLength} isDisabled={!isOwner} />
      </Flex>
    </Box>
  );
}

export default Pomodoro;
