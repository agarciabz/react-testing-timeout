/* eslint-disable @typescript-eslint/no-explicit-any */
// Adding NodeJS.Timeout typing here because tests will use it here.
export type Timeout = number | NodeJS.Timeout;

/**
 * Debounces a function to be executed after a specified delay.
 * @param fn The function to be debounced.
 * @param delay The delay in milliseconds before the function is executed.
 * @param immediate Determines whether the function should be executed immediately on the leading edge.
 * @returns A number that can be called with clearTimeout to cancel the debounced execution.
 */
export const debounce = (
  fn: (...args: any[]) => void,
  delay: number,
  immediate: boolean = false
) => {
  let timeout: Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    if (immediate && timeout === null) fn.apply(this, args);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    return timeout as Timeout;
  };
};
