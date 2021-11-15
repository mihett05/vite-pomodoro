import { useState, useEffect } from 'react';
import { editSession, Session } from '../db';

function usePomodoroTimer(session: Session, isOwner: boolean) {
  const { lastTime, endTime, breaks, isPaused, hasLongBreak, state, sessionLength, breakLength } = session;
  const [clientLastTime, setClientLastTime] = useState(lastTime);

  const remainingTime = Math.floor((endTime - clientLastTime) / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime - minutes * 60;
  const formattedDate = [minutes, seconds].map((v) => (v < 10 ? `0${v}` : v)).join(':');
  const isLongBreak = breaks % 4 === 0;

  const progress =
    (1 - remainingTime / ((state === 'session' ? sessionLength : isLongBreak ? 2 * breakLength : breakLength) * 60)) *
    100;

  useEffect(() => {
    if (isOwner) {
      editSession({
        isOnline: true,
      });
      return () => {
        // on page leave
        editSession({
          isPaused: true,
          isOnline: false,
        });
      };
    }
  }, []);

  useEffect(() => {
    setClientLastTime(lastTime);
    if (!isPaused) {
      const interval = setInterval(() => {
        setClientLastTime(new Date().getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, lastTime]);

  useEffect(() => {
    if (isOwner) {
      if (remainingTime <= 0) {
        const newState = state === 'session' ? 'break' : 'session';
        let endTime = new Date().getTime() + (newState === 'session' ? sessionLength : breakLength) * 60 * 1000;
        if (hasLongBreak && newState === 'break' && breaks !== 0 && (breaks + 1) % 4 === 0) {
          endTime = new Date().getTime() + breakLength * 2 * 60 * 1000;
        }
        editSession({
          state: newState,
          lastTime: new Date().getTime(),
          endTime,
          breaks: breaks + (newState === 'break' ? 1 : 0),
        });
      }
    }
  }, [remainingTime]);

  return {
    date: formattedDate,
    progress,
  };
}

export default usePomodoroTimer;
