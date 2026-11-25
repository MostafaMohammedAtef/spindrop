export default function VinylLoadingScreen({ isLeaving = false }: { isLeaving?: boolean }) {
  return (
    <div className={`vinyl-loading-screen ${isLeaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="vinyl-loading-brand">
        <img src="/spindrop-icon-default.webp" alt="" width="40" height="40" fetchPriority="high" />
        <span>SPINDROP</span>
      </div>

      <div className="vinyl-loading-stage" aria-hidden="true">
        <div className="vinyl-loading-record">
          <span className="vinyl-loading-groove vinyl-loading-groove-one" />
          <span className="vinyl-loading-groove vinyl-loading-groove-two" />
          <span className="vinyl-loading-groove vinyl-loading-groove-three" />
          <span className="vinyl-loading-label">
            <span className="vinyl-loading-label-line" />
            <span className="vinyl-loading-spindle" />
          </span>
        </div>
        <svg className="vinyl-loading-arm" viewBox="0 0 120 120">
          <path d="M91 12 L103 20 L88 57 L70 76" />
          <circle cx="96" cy="15" r="9" />
          <path d="M64 75 L75 82 L69 91 L58 84 Z" />
        </svg>
      </div>

      <p className="vinyl-loading-caption">SETTING THE TONE<span>...</span></p>
    </div>
  );
}
