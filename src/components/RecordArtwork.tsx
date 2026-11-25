import type { SyntheticEvent } from 'react';
import placeholder from '../assets/vinyls/placeholder.webp';

type RecordArtworkProps = {
  src: string;
  alt: string;
  className?: string;
  smallSrc?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function RecordArtwork({ src, alt, className, smallSrc, width = 1200, height = 675, loading = 'lazy', fetchPriority = 'auto' }: RecordArtworkProps) {
  function useFallback(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied !== 'true') {
      image.dataset.fallbackApplied = 'true';
      image.removeAttribute('srcset');
      image.src = placeholder;
    }
  }

  return <img src={src} srcSet={smallSrc ? `${smallSrc} 480w, ${src} 1200w` : undefined} sizes={smallSrc ? '(min-width: 1024px) 27vw, 86vw' : undefined} alt={alt} width={width} height={height} loading={loading} fetchPriority={fetchPriority} decoding="async" onError={useFallback} className={className} />;
}
