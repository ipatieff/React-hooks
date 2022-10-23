import {useRef} from 'react';

function useThrottle(func: VoidFunction, delay: number) {
    const savedTimeout = useRef<ReturnType<typeof setTimeout> | null>();
    return function () {
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
}

export default useThrottle;


/** Usage:
 *
 * const handleClick = useThrottle(() => console.log('Do click'), 1500);
 *
 * **/
