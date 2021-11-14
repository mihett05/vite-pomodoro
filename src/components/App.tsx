import React from 'react';
import { Heading, Box, Flex, Center, Button, IconButton } from '@chakra-ui/react';

import Layout from './Layout';
import AuthProvider from './AuthProvider';
import Pomodoro from './Pomodoro';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Flex>
          <Pomodoro />
          <Box>
            <Heading>Session</Heading>
          </Box>
        </Flex>
      </Layout>
    </AuthProvider>
  );
}

export default App;
