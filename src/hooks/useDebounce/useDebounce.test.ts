import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with null state', () => {
    const { result } = renderHook(() => useDebounce<string>(null, 1000));
    expect(result.current[0]).toBeNull();
  });

  it('should update state after delay', () => {
    const { result } = renderHook(() => useDebounce<string>(null, 1000));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBeNull();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe('new value');
  });
});
