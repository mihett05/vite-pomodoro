import React, { useState } from 'react';
import { Box, Center, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';

function Pomodoro() {
  const [paused, setPaused] = useState<boolean>(true);

  const onTogglePause = () => {
    setPaused(!paused);
  };

  return (
    <Box
      style={{
        padding: '10vw',
      }}
    >
      <Center>
        <Heading>11:00</Heading>
      </Center>
      <Flex>
        <IconButton aria-label="Pause/Resume" icon={paused ? <FaPlay /> : <FaPause />} onClick={onTogglePause} />
      </Flex>
    </Box>
  );
}

export default Pomodoro;
