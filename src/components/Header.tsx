import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NameEditable from './NameEditable';

function Header() {
  const [name, setName] = useState('Name');

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
          <Button>Create session</Button>
        </Box>
        <Center pl="2">
          <NameEditable />
        </Center>
      </Flex>
    </Container>
  );
}

export default Header;
