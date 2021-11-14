import React from 'react';
import { Box, Button, Center, Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import NameEditable from './NameEditable';

function Header() {
  return (
    <Container maxW="container.xl">
      <Flex>
        <Link to="/">
          <Heading as="h1" size="xl">
            Pomodoro Sessions
          </Heading>
        </Link>
        <Spacer />
        <Box p="2">
          <Link to={`/session/${auth.currentUser?.uid}`}>
            <Button>My session</Button>
          </Link>
        </Box>
        <Center pl="2">
          <NameEditable />
        </Center>
      </Flex>
    </Container>
  );
}

export default Header;
