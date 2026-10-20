import config from "../../config";

type Props = { className?: string };

// Logo de marca. Mientras no esté el SVG real (diseñadora), se muestra un logotipo
// tipográfico temporal ("legally cool" en Cormorant Garamond). Apenas config.marca.logo
// deje de ser un placeholder, este componente pasa a renderizar el archivo real —
// no hace falta tocar Navbar.tsx ni Footer.tsx.
export default function Logo({ className = "" }: Props) {
  const { logo, wordmark } = config.marca;
  const tieneLogoReal = Boolean(logo) && !logo.startsWith("PLACEHOLDER");

  if (tieneLogoReal) {
    return <img src={logo} alt={wordmark} className={className} />;
  }

  return (
    <span className={`font-serif italic tracking-wide ${className}`}>{wordmark}</span>
  );
}
