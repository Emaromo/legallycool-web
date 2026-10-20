import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SobreMi from "./components/SobreMi";
import Areas from "./components/Areas";
import Reserva from "./components/Reserva";
import Footer from "./components/Footer";
import Chatbot from "./chat/Chatbot";
import { burstParticles, clearAllParticles } from "./utils/particles";

export default function App() {
  // Partículas rosa neón en cualquier clic de la landing (solo escucha; nunca previene
  // ni detiene el evento, así que no interfiere con botones/links/carrusel reales).
  useEffect(() => {
    const onClick = (e: MouseEvent) => burstParticles(e.clientX, e.clientY);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearAllParticles();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <SobreMi />
      <Areas />
      <Reserva />
      <Footer />
      <Chatbot />
    </>
  );
}
