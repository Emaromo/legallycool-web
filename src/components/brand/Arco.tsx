type Props = { className?: string };

// Recurso gráfico de marca: círculo incompleto / arco. Protección, comunidad, proceso.
// Usar con moderación (BRAND_legallycool.md, sección 4).
export default function Arco({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 30C6 16.7452 16.7452 6 30 6C36.5 6 42.4 8.6 46.7 12.8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
