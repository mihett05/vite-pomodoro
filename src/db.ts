import { ref, set, update } from 'firebase/database';
import { db, auth } from './firebase';
import { adjectives, colors, starWars, uniqueNamesGenerator } from 'unique-names-generator';

export interface Session {
  sessionLength: number;
  breakLength: number;
  hasLongBreak: true;
  isPaused: boolean;
  isOnline: boolean;
  state: 'session' | 'break';
  lastTime: number; // time since start of timer(resume or real start)
  endTime: number;
}

export type SessionChanges = {
  [k in keyof Session]?: Session[k];
};

export const setUserName = async (name: string) => {
  if (auth.currentUser) {
    const nameRef = ref(db, `users/${auth.currentUser.uid}`);
    await set(nameRef, name);
  }
};

export const generateUserName = (): string => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, starWars],
    length: 2,
    separator: ' ',
    style: 'capital',
  });
};

export const createSession = async () => {
  if (auth.currentUser) {
    const sessionRef = ref(db, `sessions/${auth.currentUser.uid}`);
    await set(sessionRef, {
      sessionLength: 25,
      breakLength: 5,
      hasLongBreak: true,
      isPaused: true,
      isOnline: false,
      state: 'session',
      lastTime: new Date().getTime(),
      endTime: new Date().getTime() + 25 * 60 * 1000,
    } as Session);
  }
};

export const editSession = async (changes: SessionChanges) => {
  if (auth.currentUser) {
    const sessionRef = ref(db, `sessions/${auth.currentUser.uid}`);
    await update(sessionRef, changes);
  }
};
