import React, { useContext } from 'react';

import { Center, Flex, IconButton, Spacer, Switch, Text, Tooltip, useClipboard, useToast } from '@chakra-ui/react';
import { FaPause, FaPlay, FaShare } from 'react-icons/fa';
import { RepeatClockIcon } from '@chakra-ui/icons';

import { editSession, SessionChanges } from '../db';
import TimeInput from './TimeInput';
import { SessionContext } from './SessionProvider';

function PomodoroControls() {
  const {
    session: { isPaused, sessionLength, breakLength, hasLongBreak, endTime, lastTime },
    uid,
    isOwner,
  } = useContext(SessionContext);
  const { onCopy, hasCopied } = useClipboard(`https://vite-pomodoro.firebaseapp.com/sessions/${uid}`);
  const toast = useToast();

  const getResetData = (endLength: number): SessionChanges => ({
    isPaused: true,
    lastTime: new Date().getTime(),
    endTime: new Date().getTime() + endLength * 60 * 1000,
    state: 'session',
  });

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

  const onReset = () => editSession(getResetData(sessionLength));
  const onShare = () => {
    onCopy();
    if (!hasCopied) {
      toast({
        title: 'Sessions link was copied',
        description: 'Now you can share this link with someone',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
    <>
      <Center my="2">
        <Flex>
          <Tooltip label={isPaused ? 'Resume' : 'Pause'}>
            <IconButton
              aria-label="Pause/Resume"
              icon={isPaused ? <FaPlay /> : <FaPause />}
              onClick={onTogglePause}
              isDisabled={!isOwner}
              mr="4"
            />
          </Tooltip>
          <Tooltip label="Reset">
            <IconButton aria-label="Reset" icon={<RepeatClockIcon />} onClick={onReset} isDisabled={!isOwner} mr="4" />
          </Tooltip>
          <Tooltip label="Share session's link">
            <IconButton aria-label="Share" icon={<FaShare />} onClick={onShare} isDisabled={hasCopied} />
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
              <Center mt="2">
                <Switch isDisabled={!isOwner} isChecked={hasLongBreak} onChange={toggleLongBreak} />
              </Center>
            </Flex>
          </Center>
        </Tooltip>
        <Spacer />
        <TimeInput name="Break length(min)" value={breakLength} onChange={onEditBreakLength} isDisabled={!isOwner} />
      </Flex>
    </>
  );
}

export default PomodoroControls;
