const crest = new URL('../assets/harry-media-crest.png', import.meta.url).href;
export function BrandIdentity({ className = '' }: { className?: string }) {
  return (
    <span className={`brand-identity ${className}`}>
      <img
        className="brand-crest"
        src={crest}
        width={256}
        height={256}
        alt=""
      />
      <span className="identity-wordmark">
        Harry Baker<span>MEDIA</span>
      </span>
    </span>
  );
}
