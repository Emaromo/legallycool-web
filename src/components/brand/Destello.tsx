type Props = { className?: string };

// Recurso gráfico de marca: destello / estrella de 4 puntas. Idea creativa.
// Uso puntual, no excesivo (BRAND_legallycool.md, sección 4).
export default function Destello({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4C24.9 14.6 29.4 19.1 40 20C29.4 20.9 24.9 25.4 24 36C23.1 25.4 18.6 20.9 8 20C18.6 19.1 23.1 14.6 24 4Z"
        fill="currentColor"
      />
    </svg>
  );
}
