const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="cco-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000434"/>
      <stop offset="100%" stop-color="#0099D8"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#cco-g)"/>
  <text x="16" y="23" font-family="'Century Gothic','Futura',sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">CC</text>
</svg>`

export const ccoFaviconHref = `data:image/svg+xml,${encodeURIComponent(svgContent)}`

export function FaviconLink() {
  return <link rel="icon" type="image/svg+xml" href={ccoFaviconHref} />
}
