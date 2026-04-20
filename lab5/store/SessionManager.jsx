import React, { createContext, useState, useContext, useMemo } from 'react';
import { useRouter } from 'expo-router';

const UserSession = createContext(null);

export const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const sessionValue = useMemo(() => ({
    isAuthenticated: !!currentUser,
    user: currentUser,
    isSyncing,
    
    signIn: (email, password) => {
      setIsSyncing(true);
      setTimeout(() => {
        setCurrentUser({ email, fullName: 'Олійник Дмитро', role: 'student' });
        setIsSyncing(false);
        router.replace('/(app)'); 
      }, 800);
    },

    signUp: (email, pass, name) => {
      setCurrentUser({ email, fullName: name });
      router.replace('/(app)');
    },

    signOut: () => {
      setCurrentUser(null);
      router.replace('/(auth)/login'); 
    }
  }), [currentUser, isSyncing]);

  return (
    <UserSession.Provider value={sessionValue}>
      {children}
    </UserSession.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserSession);
  if (!context) {
    throw new Error('useAuth must be used within a SessionProvider');
  }
  return context;
};