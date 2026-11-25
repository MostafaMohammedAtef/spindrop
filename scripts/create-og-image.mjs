import sharp from 'sharp';

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FFF804"/>
  <g transform="translate(920 315)">
    <circle r="240" fill="#111111"/>
    <circle r="218" fill="#E280FF"/>
    <circle r="195" fill="none" stroke="#111111" stroke-width="4"/>
    <circle r="174" fill="none" stroke="#111111" stroke-width="3"/>
    <circle r="153" fill="none" stroke="#111111" stroke-width="3"/>
    <circle r="132" fill="none" stroke="#111111" stroke-width="3"/>
    <circle r="102" fill="#FFF804" stroke="#111111" stroke-width="8"/>
    <circle r="10" fill="#111111"/>
  </g>
  <text x="66" y="134" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="#111111">SPINDROP</text>
  <text x="60" y="274" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="#111111">Press your</text>
  <text x="60" y="372" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="#111111">music on vinyl.</text>
  <text x="66" y="444" font-family="Arial, sans-serif" font-size="28" fill="#111111">Discover independent records and artists.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
