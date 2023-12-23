import { useCallback, useEffect, useState } from 'react';
import { debounce } from '../../utils/debounce';
import { Timeout } from '../../utils/debounce/debounce';

/**
 * Custom hook that provides debounced state and a function to update the debounced state.
 * @template T - The type of the state value.
 * @param initialState - The initial state value. Defaults to null.
 * @param delay - The delay in milliseconds for the debounce. Defaults to 1000ms.
 * @returns A tuple containing the debounced state and a function to update the debounced state.
 */
export const useDebounce = <T>(
  initialState: T | null = null,
  delay: number = 1000
): [T | null, (value: T) => void] => {
  const [state, setState] = useState(initialState);
  let timeout: Timeout | null;

  const setDebouncedState = (value: T) => {
    timeout = debounceValue(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValue = useCallback(
    debounce((prop: T) => {
      setState(prop);
    }, delay),
    []
  );

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setDebouncedState];
};
