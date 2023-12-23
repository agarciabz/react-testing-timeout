/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '.';

describe('debounce', () => {
  let mockFn: any;
  let debouncedFn: (...args: any[]) => void;

  beforeEach(() => {
    vi.useFakeTimers();
    mockFn = vi.fn();
    debouncedFn = debounce(mockFn, 100);
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should debounce the function call', () => {
    debouncedFn();
    debouncedFn();
    debouncedFn();
    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should debounce the function call with immediate option', () => {
    debouncedFn = debounce(mockFn, 100, true);

    debouncedFn();
    expect(mockFn).toBeCalledTimes(1);
  });
});
