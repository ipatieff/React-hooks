import { useRef } from 'react';

function useThrottle(func: VoidFunction, delay: number) {
  const savedTimeout = useRef<ReturnType<typeof setTimeout> | null>();
  const throttledFunc = function () {
    if (savedTimeout.current) {
      clearTimeout(savedTimeout.current);
    }
    const newTimeout = setTimeout(() => {
      func();
      if (newTimeout === savedTimeout.current) {
        savedTimeout.current = null;
      }
    }, delay);
    savedTimeout.current = newTimeout;
  };
  return throttledFunc;
}

export default useThrottle;


/** Usage:
 *
 * const handleClick = useThrottle(() => console.log('Do click'), 1500);
 *
 * **/

