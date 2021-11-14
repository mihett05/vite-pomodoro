import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Center, Flex, Heading, Spacer, Tag, Text } from '@chakra-ui/react';
import { Session } from '../db';

interface SessionCardProps {
  uid: string;
  name: string;
  session: Session;
}

function SessionCard({ uid, name, session }: SessionCardProps) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
      <Flex direction="column" h="100%">
        <Box>
          <Text>Pomodoro session of</Text>
        </Box>
        <Center>
          <Heading>{name}</Heading>
        </Center>
        <Spacer />
        <Box my="4">
          <Flex>
            <Tag>Session: {session.sessionLength} min.</Tag>
            <Spacer />
            <Tag>Break: {session.breakLength} min.</Tag>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Box>
              <Link to={`/sessions/${uid}`}>
                <Button>Join</Button>
              </Link>
            </Box>
            <Spacer />
            <Center>
              <Tag h="4">{session.hasLongBreak && 'Long break'}</Tag>
            </Center>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default SessionCard;
