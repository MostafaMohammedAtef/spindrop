import { useEffect, useMemo, useState } from 'react';
import { readJson, writeJson } from '../lib/storage';

const key = 'spindrop.recently-viewed';
const isRecordIdList = (value: unknown): value is string[] => Array.isArray(value) && value.length <= 8 && value.every((item) => typeof item === 'string' && item.length <= 120);

export function useRecentlyViewed(recordId?: string) {
  const [ids, setIds] = useState<string[]>(() => readJson(key, isRecordIdList, []));
  const visibleIds = useMemo(() => recordId ? [recordId, ...ids.filter((id) => id !== recordId)].slice(0, 8) : ids, [ids, recordId]);

  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === key) setIds(readJson(key, isRecordIdList, []));
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (!recordId) return;
    writeJson(key, visibleIds);
  }, [recordId, visibleIds]);

  return visibleIds;
}
