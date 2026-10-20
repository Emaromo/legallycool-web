type Props = { className?: string };

// Logo oficial de Instagram (la cámara: marco redondeado + lente + flash). Va en los
// contactos de "Sobre mí" y en las redes del footer, para que en los dos lugares se vea
// el logo real de la red y no un ícono genérico. Hereda el color con currentColor.
export default function LogoInstagram({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" />
    </svg>
  );
}
