import OvalCarousel from "@/components/OvalCarousel";
import { IMAGES, KENNEL } from "@/data/content";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const HERO_BREEDS = [
  { label: "Мальтипу",   bg: "#F5E6C8", border: "#E8C98A" },
  { label: "Той-пудели", bg: "#DFF0E4", border: "#9FD4B0" },
  { label: "Йорки",      bg: "#FAE0EC", border: "#F0AACB" },
];

const HERO_STATS = [
  [KENNEL.happyFamilies, "счастливых семей"],
  [KENNEL.yearsLabel,    "опыта разведения"],
  [KENNEL.breedsCount,   "в питомнике"],
];

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16" style={{ background: "linear-gradient(135deg, #FAF6F0 0%, #F5EAD8 50%, #FAF0F2 100%)" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute text-6xl opacity-20 animate-float" style={{ top: "8%",  right: "6%" }}>🌸</div>
        <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "35%", right: "8%",  animationDelay: "0.6s" }}>🌼</div>
        <div className="absolute text-5xl opacity-15 animate-float" style={{ top: "15%", right: "18%", animationDelay: "2s" }}>🍂</div>
        <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "55%", left: "6%",   animationDelay: "1.8s" }}>🌺</div>
        <div className="absolute text-5xl opacity-15 animate-float" style={{ top: "50%", right: "7%",  animationDelay: "0.4s" }}>🍃</div>
        <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "70%", left: "8%",   animationDelay: "2.5s" }}>🌻</div>
        <div className="absolute text-5xl opacity-15 animate-float" style={{ top: "75%", right: "8%",  animationDelay: "1.0s" }}>🍁</div>
        <div className="absolute text-4xl opacity-15 animate-float" style={{ top: "30%", left: "6%",   animationDelay: "3s" }}>🌿</div>
        <div className="absolute text-3xl opacity-20 animate-float" style={{ top: "65%", right: "12%", animationDelay: "1.5s" }}>🌷</div>
        <div className="absolute text-4xl opacity-15 animate-float" style={{ top: "85%", left: "20%",  animationDelay: "0.9s" }}>🍂</div>
        <div className="absolute text-3xl opacity-15 animate-float" style={{ top: "10%", left: "20%",  animationDelay: "2.2s" }}>🌾</div>
        <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "42%", right: "15%", animationDelay: "1.7s" }}>🪻</div>
        <div className="absolute text-3xl opacity-15 animate-float" style={{ top: "88%", right: "20%", animationDelay: "0.3s" }}>🌼</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="animate-fade-in-up min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 max-w-full" style={{ background: "rgba(92,51,23,0.08)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
            <span style={{ fontSize: "1.2em", flexShrink: 0 }}>🐕</span>
            <span className="truncate">{KENNEL.tagline}</span>
          </div>
          <img src={IMAGES.logo} alt={KENNEL.name} className="animate-float-logo" style={{ maxWidth: "100%", width: "100%", display: "block", marginBottom: "-40px" }} />
          <div className="mb-6" style={{ fontFamily: "'Golos Text', sans-serif", marginTop: "-40px" }}>
            <p className="text-lg sm:text-xl font-semibold mb-3 text-center" style={{ color: "rgba(92,51,23,0.85)" }}>Наши породы</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              {HERO_BREEDS.map(({ label, bg, border }) => (
                <button key={label} onClick={() => scrollTo("puppies")}
                  className="text-xs sm:text-sm font-medium w-full leading-tight"
                  style={{ background: bg, color: "rgba(92,51,23,0.85)", border: `1.5px solid ${border}`, borderRadius: 999, padding: "8px 6px", cursor: "pointer", transition: "box-shadow 0.2s", textAlign: "center" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(92,51,23,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >{label}</button>
              ))}
            </div>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(92,51,23,0.75)" }}>
              Продажа щенков с документами UCI, прививками и микрочипом. Доставка по России, Беларуси и всему СНГ.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button className="btn-primary" onClick={() => scrollTo("puppies")}>Всегда в наличии</button>
            <button className="btn-outline" style={{ cursor: "default", pointerEvents: "none" }}>Цены порадуют</button>
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-10">
            {HERO_STATS.map(([num, label]) => (
              <div key={label} className="min-w-0">
                <div className="font-display text-xl sm:text-2xl font-semibold" style={{ color: "var(--brown)" }}>{num}</div>
                <div className="text-xs sm:text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in delay-300 relative flex flex-col items-center overflow-hidden lg:overflow-visible" style={{ alignSelf: "flex-start", marginTop: "76px" }}>
          <OvalCarousel />
          <div className="relative mt-4 lg:absolute lg:-bottom-4 lg:-left-6 bg-white rounded-2xl shadow-xl px-4 py-3 animate-fade-in delay-500" style={{ zIndex: 10 }}>
            <div className="font-display text-base sm:text-lg" style={{ color: "var(--brown)" }}>Есть свободные щенки</div>
            <div className="text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>Уточните наличие у нас</div>
          </div>
        </div>
      </div>
    </section>
  );
}