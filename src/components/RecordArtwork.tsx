import type { SyntheticEvent } from 'react';
import placeholder from '../assets/vinyls/placeholder.webp';

type RecordArtworkProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
};

export default function RecordArtwork({ src, alt, className, width = 1200, height = 675, loading = 'lazy' }: RecordArtworkProps) {
  function useFallback(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied !== 'true') {
      image.dataset.fallbackApplied = 'true';
      image.src = placeholder;
    }
  }

  return <img src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" onError={useFallback} className={className} />;
}
