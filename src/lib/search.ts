import type { RecordProduct } from '../data/records';

export function rankRecords(records: RecordProduct[], query: string) {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return [];
  return records
    .map((record) => {
      const title = record.title.toLocaleLowerCase();
      const artist = record.artists.join(' ').toLocaleLowerCase();
      const genre = record.genre.toLocaleLowerCase();
      const rank = title === term || artist === term ? 0 : title.startsWith(term) || artist.startsWith(term) ? 1 : `${title} ${artist} ${genre}`.includes(term) ? 2 : 3;
      return { record, rank };
    })
    .filter((result) => result.rank < 3)
    .sort((first, second) => first.rank - second.rank || first.record.title.localeCompare(second.record.title));
}
