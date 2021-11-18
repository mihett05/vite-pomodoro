import React, { createContext, useState, useEffect } from 'react';
import { Users } from '../database/users';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';

export const UsersContext = createContext<Users>({});

interface UsersProviderProps {
  children: React.ReactNode;
}

function UsersProvider({ children }: UsersProviderProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [users, setUsers] = useState<Users>({});

  useEffect(() => {
    return onValue(ref(db, `users`), (data) => {
      setUsers(data.val());
      setLoaded(true);
    });
  }, [setUsers]);

  if (!loaded) {
    return <>Loading...</>;
  }

  return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>;
}
export default UsersProvider;
