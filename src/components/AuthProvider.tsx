import React, { createContext, useEffect, useState } from 'react';
import { User, signInAnonymously } from 'firebase/auth';

import { auth } from '../firebase';

export const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user === null) {
        signInAnonymously(auth);
      } else {
        setCurrentUser(user);
        setIsLoading(false);
      }
    });
  });

  return <AuthContext.Provider value={currentUser}>{isLoading ? null : children}</AuthContext.Provider>;
}

export default AuthProvider;
