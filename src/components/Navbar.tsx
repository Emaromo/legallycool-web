import { useState } from "react";
import config from "../config";
import Logo from "./brand/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { links } = config.nav;

  const handleLinkClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div className="bg-white rounded-full shadow-lg px-5 py-3 flex items-center justify-between">
        <a
          href="#top"
          className="focus-ring rounded-sm"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logo className="h-8 md:h-10 w-auto" />
        </a>

        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="focus-ring group relative w-8 h-8 flex items-center justify-center rounded-full"
        >
          <span
            className={`absolute block h-0.5 w-5 bg-lc-carbon transition-all duration-300 group-hover:bg-lc-naranja ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute block h-0.5 w-5 bg-lc-carbon transition-all duration-300 group-hover:bg-lc-naranja ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block h-0.5 w-5 bg-lc-carbon transition-all duration-300 group-hover:bg-lc-naranja ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="mt-2 bg-white rounded-2xl shadow-lg py-3 px-4 animate-fade-in-down">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="link-underline focus-ring inline-block py-2 text-lc-carbon font-medium rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
