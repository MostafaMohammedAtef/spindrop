import { describe, expect, it } from 'vitest';
import { records } from '../data/records';
import { rankRecords } from './search';

describe('record search ranking', () => {
  it('ranks exact matches before prefix and contains matches', () => {
    const results = rankRecords(records, 'starboy');
    expect(results[0].record.id).toBe('weeknd-starboy');
  });

  it('searches artist names and genre tags', () => {
    expect(rankRecords(records, 'Olivia Rodrigo')[0].record.id).toBe('olivia-rodrigo-drop-head');
    expect(rankRecords(records, 'carnatic')[0].record.id).toBe('vinyl-one');
  });
});
