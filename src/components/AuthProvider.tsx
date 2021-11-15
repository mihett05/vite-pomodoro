import React, { createContext, useEffect, useState } from 'react';
import { User, signInAnonymously } from 'firebase/auth';

import { auth } from '../firebase';
import { createSession, setUserName, generateUserName } from '../db';
import { set } from 'firebase/database';

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        const credentials = await signInAnonymously(auth);
        await setUserName(generateUserName(), credentials.user.uid);
        await createSession();
      } else {
        setCurrentUser(user);
        setIsLoading(false);
      }
    });
  });

  return <AuthContext.Provider value={currentUser}>{isLoading ? null : children}</AuthContext.Provider>;
}

export default AuthProvider;
