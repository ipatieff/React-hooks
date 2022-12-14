import { useEffect, useRef } from 'react';

function useCountInterval(callback: () => void, delay: number, count: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const interval = setInterval(tick, delay);

    function tick() {
      if (count > 0) {
        savedCallback?.current();
      } else {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [delay, count]);
}

export default useCountInterval;

/** Usage:
*   const [counter, setCounter] = useState(60);
*
*  useCountInterval(
*    () => {
*      setCounter(counter - 1);
*    },
*    1000,
*    counter,
*  );
*
* <TimerCode
*    value={counter}
*    reSend={handleResendCode}
*    resendMessage="Resend code"
*  />
*  **/


