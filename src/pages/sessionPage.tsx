import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

import Pomodoro from '../components/Pomodoro';

function SessionPage() {
  return (
    <Flex>
      <Pomodoro />
      <Box>
        <Heading>Session</Heading>
      </Box>
    </Flex>
  );
}

export default SessionPage;
