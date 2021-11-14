import React, { useEffect, useMemo, useState } from 'react';
import { Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { onValue, query, ref } from 'firebase/database';
import { db } from '../firebase';
import { Sessions, Users } from '../db';
import SessionCard from '../components/SessionCard';

function HomePage() {
  const [sessions, setSessions] = useState<Sessions>({});
  const [users, setUsers] = useState<Users>({});

  const activeSessions = useMemo(() => Object.keys(sessions).filter((uid) => sessions[uid].isOnline), [sessions]);

  useEffect(() => {
    return onValue(query(ref(db, `sessions`)), (data) => {
      setSessions(data.val());
    });
  }, [setSessions]);

  useEffect(() => {
    return onValue(query(ref(db, `users`)), (data) => {
      setUsers(data.val());
    });
  }, [setUsers]);

  return (
    <>
      <Center>
        <Heading mb="5">Users pomodoro sessions</Heading>
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
