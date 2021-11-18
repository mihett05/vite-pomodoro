import React, { useContext, useEffect } from 'react';
import { child, onChildAdded, onChildRemoved, onDisconnect } from 'firebase/database';
import { toast, useToast } from '@chakra-ui/react';

import { getRoomRef, joinRoom, leaveRoom } from '../database/rooms';
import { SessionContext } from '../contexts/SessionProvider';
import { UsersContext } from '../contexts/UsersProvider';
import { auth } from '../firebase';

interface RoomProps {
  children: React.ReactNode;
}

function Room({ children }: RoomProps) {
  const { uid } = useContext(SessionContext);
  const users = useContext(UsersContext);
  const toast = useToast();
  const onJoin = (name: string) =>
    toast({
      title: `${name} has joined`,
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    });
  const onLeave = (name: string) =>
    toast({
      title: `${name} has left`,
      status: 'info',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    });

  useEffect(() => {
    if (auth.currentUser) {
      joinRoom(uid);
      return () => {
        leaveRoom(uid);
      };
    }
  }, [uid]);

  useEffect(() => {
    if (auth.currentUser) {
      const disconnect = onDisconnect(child(getRoomRef(uid), auth.currentUser?.uid));
      disconnect.remove();
      return () => {
        disconnect.cancel();
      };
    }
  }, []);

  useEffect(
    () =>
      onChildAdded(getRoomRef(uid), (data) => {
        const memberId = data.key as string;
        if (memberId !== auth.currentUser?.uid) {
          const name = users[memberId];
          onJoin(name);
        }
      }),
    [uid],
  );
  useEffect(
    () =>
      onChildRemoved(getRoomRef(uid), (data) => {
        const memberId = data.key as string;
        if (memberId !== auth.currentUser?.uid) {
          const name = users[memberId];
          onLeave(name);
        }
      }),
    [uid],
  );

  return <>{children}</>;
}

export default Room;
