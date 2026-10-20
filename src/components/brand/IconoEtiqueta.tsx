type Props = { className?: string; gradientId?: string };

// Ícono de marca: etiqueta — clasificar (BRAND_legallycool.md, sección 4).
// gradientId opcional: ver IconoMarcaRegistrada.tsx.
export default function IconoEtiqueta({ className, gradientId }: Props) {
  const color = gradientId ? `url(#${gradientId})` : "currentColor";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11.5 3.5h6a1 1 0 0 1 1 1v6a1 1 0 0 1-.3.7l-8 8a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 .7-.3Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="8.5" r="1.4" fill={color} />
    </svg>
  );
}
