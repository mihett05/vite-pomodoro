import { auth, db } from '../firebase';
import { ref, child, update, remove } from 'firebase/database';
import { UserId } from './users';

export const getRoomRef = (ownerId: UserId) => ref(db, `rooms/${ownerId}`);

export const joinRoom = async (ownerId: UserId) => {
  if (auth.currentUser) {
    const roomRef = getRoomRef(ownerId);
    await update(roomRef, {
      [auth.currentUser.uid]: true,
    });
  }
};

export const leaveRoom = async (ownerId: UserId) => {
  if (auth.currentUser) {
    const memberRef = child(getRoomRef(ownerId), auth.currentUser.uid);
    await remove(memberRef);
  }
};
