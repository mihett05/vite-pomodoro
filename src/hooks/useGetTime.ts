import { useContext } from 'react';
import { OffsetContext } from '../contexts/OffsetProvider';

function useGetTime(): () => number {
  const offset = useContext(OffsetContext);

  return () => new Date().getTime() + offset;
}

export default useGetTime;
