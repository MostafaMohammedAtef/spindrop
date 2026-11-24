import { Link } from 'react-router-dom';
import { artistSlug } from '../data/records';

export default function ArtistLinks({ artists }: { artists: string[] }) {
  if (artists.length === 0) {
    return <span>Artist unknown</span>;
  }

  return (
    <>
      {artists.map((artist, index) => (
        <span key={artist}>
          {index > 0 && ', '}
          <Link to={`/artists/${artistSlug(artist)}`} className="underline decoration-transparent underline-offset-4 hover:decoration-current">
            {artist}
          </Link>
        </span>
      ))}
    </>
  );
}
