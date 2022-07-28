import { useEffect, useRef } from 'react';

function useCountInterval(callback: () => void, delay: number, count: number) {
  const savedCallback = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const interval = setInterval(tick, delay);

    function tick() {
      if (count > 0) {
        savedCallback.current();
      } else {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [delay, count]);
}

export default useCountInterval;
