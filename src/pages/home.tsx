import React, { useContext, useEffect, useMemo, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { Link as RouterLink } from 'react-router-dom';
import { Center, Heading, Link, SimpleGrid } from '@chakra-ui/react';

import { auth, db } from '../firebase';
import { Sessions } from '../database/sessions';
import { UsersContext } from '../contexts/UsersProvider';

import SessionCard from '../components/SessionCard';

function HomePage() {
  const [sessions, setSessions] = useState<Sessions>({});
  const users = useContext(UsersContext);

  const activeSessions = useMemo(
    () =>
      Object.keys(sessions)
        .filter((uid) => sessions[uid].isOnline && uid !== auth.currentUser?.uid)
        .sort((a, b) => {
          const sessionA = sessions[a].endTime;
          const sessionB = sessions[b].endTime;
          if (sessionA < sessionB) return 1;
          else if (sessionA === sessionB) return 0;
          else return -1;
        }),
    [sessions],
  );

  useEffect(() => {
    return onValue(ref(db, `sessions`), (data) => {
      setSessions(data.val());
    });
  }, [setSessions]);

  return (
    <>
      <Center>
        <Heading mb="5" textAlign="center">
          Users pomodoro sessions
        </Heading>
      </Center>
      <Center h="70vh">
        <Heading fontSize="2xl" textAlign="center">
          There are no active sessions,{' '}
          <Link as={RouterLink} color="teal.500" to={`/sessions/${auth.currentUser?.uid}`}>
            create one
          </Link>
        </Heading>
      </Center>
      <SimpleGrid minChildWidth="300px" spacing={5}>
        {activeSessions.map((uid) => (
          <SessionCard uid={uid} name={users[uid]} session={sessions[uid]} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default HomePage;
