type Props = { className?: string };

// Recurso gráfico de marca: bloque geométrico (rectángulos/módulos). Orden,
// estructura, lo jurídico (BRAND_legallycool.md, sección 4).
export default function BloqueGeometrico({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="6" width="16" height="16" fill="currentColor" />
      <rect x="26" y="6" width="16" height="6" fill="currentColor" opacity="0.5" />
      <rect x="26" y="16" width="10" height="6" fill="currentColor" opacity="0.5" />
      <rect x="6" y="28" width="36" height="4" fill="currentColor" opacity="0.5" />
      <rect x="6" y="36" width="24" height="4" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
