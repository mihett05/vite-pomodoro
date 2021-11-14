import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
  Switch,
  Text,
} from '@chakra-ui/react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import { FaPause, FaPlay } from 'react-icons/fa';
import { Session, editSession, SessionChanges } from '../db';
import TimeInput from './TimeInput';

interface PomodoroProps {
  session: Session;
  isOwner: boolean;
}

function Pomodoro({ session, isOwner }: PomodoroProps) {
  const { isPaused, lastTime, endTime, state, sessionLength, breakLength, hasLongBreak, breaks } = session;
  const [clientLastTime, setClientLastTime] = useState(lastTime);

  const remainingTime = Math.floor((endTime - clientLastTime) / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime - minutes * 60;
  const formattedDate = [minutes, seconds].map((v) => (v < 10 ? `0${v}` : v)).join(':');
  const isLongBreak = breaks % 4 === 0;

  useEffect(() => {
    if (isOwner) {
      editSession({
        isOnline: true,
      });
      return () => {
        // on page leave
        editSession({
          isPaused: true,
          isOnline: false,
        });
      };
    }
  }, []);

  useEffect(() => {
    setClientLastTime(lastTime);
    if (!isPaused) {
      const interval = setInterval(() => {
        setClientLastTime(new Date().getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, lastTime]);

  useEffect(() => {
    if (isOwner) {
      if (remainingTime <= 0) {
        const newState = state === 'session' ? 'break' : 'session';
        let endTime = new Date().getTime() + (newState === 'session' ? sessionLength : breakLength) * 60 * 1000;
        if (hasLongBreak && newState === 'break' && breaks !== 0 && (breaks + 1) % 4 === 0) {
          endTime = new Date().getTime() + breakLength * 2 * 60 * 1000;
        }
        editSession({
          state: newState,
          lastTime: new Date().getTime(),
          endTime,
          breaks: breaks + (newState === 'break' ? 1 : 0),
        });
      }
    }
  }, [remainingTime]);

  const getResetData = (endLength: number): SessionChanges => ({
    isPaused: true,
    lastTime: new Date().getTime(),
    endTime: new Date().getTime() + endLength * 60 * 1000,
    state: 'session',
  });

  const onTogglePause = () => {
    if (isOwner) {
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
    }
  };

  const onReset = () => editSession(getResetData(sessionLength));

  const onEditSessionLength = (value: number) =>
    editSession({
      sessionLength: value,
      ...getResetData(value),
    });

  const onEditBreakLength = (value: number) =>
    editSession({
      breakLength: value,
      ...getResetData(sessionLength),
    });

  const toggleLongBreak = () =>
    editSession({
      hasLongBreak: !hasLongBreak,
    });

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
          value={
            (1 -
              remainingTime /
                ((state === 'session' ? sessionLength : isLongBreak ? 2 * breakLength : breakLength) * 60)) *
            100
          }
          size="4em"
          color={state === 'session' ? 'cyan.400' : 'teal.400'}
        >
          <CircularProgressLabel>
            <Heading>{formattedDate}</Heading>
          </CircularProgressLabel>
        </CircularProgress>
      </Center>
      <Center>
        <Flex>
          <Tooltip label={isPaused ? 'Resume' : 'Paused'}>
            <IconButton
              aria-label="Pause/Resume"
              icon={isPaused ? <FaPlay /> : <FaPause />}
              onClick={onTogglePause}
              isDisabled={!isOwner}
              mr="4"
            />
          </Tooltip>
          <Tooltip label="Reset">
            <IconButton aria-label="Reset" icon={<RepeatClockIcon />} onClick={onReset} isDisabled={!isOwner} />
          </Tooltip>
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
        <Tooltip label="A long break session of x2 of break time. This will be activated every 4th break session.">
          <Center>
            <Flex direction="column">
              <Center>
                <Text>Long break</Text>
              </Center>
              <Center>
                <Switch isDisabled={!isOwner} isChecked={hasLongBreak} onChange={toggleLongBreak} />
              </Center>
            </Flex>
          </Center>
        </Tooltip>
        <Spacer />
        <TimeInput name="Break length(min)" value={breakLength} onChange={onEditBreakLength} isDisabled={!isOwner} />
      </Flex>
    </Box>
  );
}

export default Pomodoro;
