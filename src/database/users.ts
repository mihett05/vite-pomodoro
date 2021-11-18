import { auth, db } from '../firebase';
import { ref, set } from 'firebase/database';
import { adjectives, colors, starWars, uniqueNamesGenerator } from 'unique-names-generator';

export type UserId = string;
export type Users = Record<string, string>;

export const getUserRef = () => ref(db, `users/${auth.currentUser?.uid}`);

export const setUserName = async (name: string, uid = auth.currentUser?.uid || '') => {
  if (auth.currentUser || uid) {
    const nameRef = ref(db, `users/${uid}`);
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
