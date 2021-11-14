import { ref, set } from 'firebase/database';
import { db, auth } from './firebase';
import { adjectives, colors, starWars, uniqueNamesGenerator } from 'unique-names-generator';

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
