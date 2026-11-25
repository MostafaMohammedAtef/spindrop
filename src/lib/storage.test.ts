import { describe, expect, it, beforeEach, vi } from 'vitest';
import { readJson, writeJson } from './storage';

const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((entry) => typeof entry === 'string');

describe('browser storage helpers', () => {
  beforeEach(() => window.localStorage.clear());

  it('returns fallback for corrupt JSON', () => {
    window.localStorage.setItem('broken', '{');
    expect(readJson('broken', isStringArray, ['safe'])).toEqual(['safe']);
  });

  it('rejects values that fail validation', () => {
    window.localStorage.setItem('invalid', JSON.stringify({ value: 1 }));
    expect(readJson('invalid', isStringArray, [])).toEqual([]);
  });

  it('writes and reads validated JSON', () => {
    expect(writeJson('saved', ['a', 'b'])).toBe(true);
    expect(readJson('saved', isStringArray, [])).toEqual(['a', 'b']);
  });

  it('returns the fallback when browser storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    expect(readJson('blocked', isStringArray, ['safe'])).toEqual(['safe']);
    vi.restoreAllMocks();
  });
});
