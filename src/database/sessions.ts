import { ref, set, update } from 'firebase/database';
import { db, auth } from '../firebase';
import { UserId } from './users';

export interface Session {
  sessionLength: number;
  breakLength: number;
  hasLongBreak: boolean;
  isPaused: boolean;
  isOnline: boolean;
  state: 'session' | 'break';
  lastTime: number; // time since start of timer(resume or real start)
  endTime: number;
  breaks: number;
}

export type Sessions = Record<UserId, Session>;

export type SessionChanges = {
  [k in keyof Session]?: Session[k];
};

export const getSessionRef = (ownerId: UserId) => ref(db, `sessions/${ownerId}`);

export const createSession = async () => {
  if (auth.currentUser) {
    const sessionRef = getSessionRef(auth.currentUser.uid);
    await set(sessionRef, {
      sessionLength: 25,
      breakLength: 5,
      hasLongBreak: true,
      isPaused: true,
      isOnline: false,
      state: 'session',
      lastTime: new Date().getTime(),
      endTime: new Date().getTime() + 25 * 60 * 1000,
      breaks: 0,
    } as Session);
  }
};

export const editSession = async (changes: SessionChanges) => {
  if (auth.currentUser) {
    const sessionRef = getSessionRef(auth.currentUser.uid);
    await update(sessionRef, changes);
  }
};
