import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BREEDS, IMAGES, KENNEL } from "@/data/content";

export default function Breeds() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <div className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ background: "rgba(250,246,240,0.92)", borderColor: "rgba(92,51,23,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 transition-opacity hover:opacity-70" style={{ color: "var(--brown)" }}>
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium">На главную</span>
          </button>
          <div className="h-5 w-px" style={{ background: "rgba(92,51,23,0.15)" }} />
          <span className="font-display text-base font-semibold cursor-pointer" style={{ color: "var(--brown)" }} onClick={() => navigate("/")}>{KENNEL.nameEn}</span>
        </div>
      </div>

      {/* TITLE */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)" }}>Наши породы</div>
        <h1 className="section-title mb-4">Три породы —<br /><em>одна любовь</em></h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(92,51,23,0.6)" }}>
          Мы разводим только те породы, в которых уверены: здоровые линии, чистые родословные и характеры, проверенные годами
        </p>
      </div>

      {/* BREED CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-20 flex flex-col gap-10">
        {BREEDS.map((breed, idx) => (
          <div
            key={breed.slug}
            className="rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl"
            style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
            onClick={() => navigate(`/breeds/${breed.slug}`)}
          >
            <div className={`grid lg:grid-cols-2 ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              {/* Фото */}
              <div className={`relative overflow-hidden ${idx % 2 === 1 ? "lg:col-start-2" : ""}`} style={{ minHeight: 340 }}>
                <img
                  src={breed.image || IMAGES.puppy}
                  alt={breed.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ minHeight: 340 }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.08), transparent)" }} />
                <div className="absolute top-6 left-6 text-5xl">{breed.emoji}</div>
              </div>

              {/* Текст */}
              <div className="flex flex-col justify-center p-10 lg:p-14" style={{ background: breed.color }}>
                <div className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: breed.accentColor }}>
                  Порода
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4" style={{ color: "var(--brown)" }}>
                  {breed.name}
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(92,51,23,0.75)" }}>
                  {breed.desc}
                </p>
                <div className="flex gap-2 flex-wrap mb-8">
                  {breed.traits.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)" }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-6 mb-8 text-sm" style={{ color: "var(--brown-light)" }}>
                  <span><b style={{ color: "var(--brown)" }}>Вес:</b> {breed.weight}</span>
                  <span><b style={{ color: "var(--brown)" }}>Рост:</b> {breed.height}</span>
                  <span><b style={{ color: "var(--brown)" }}>Жизнь:</b> {breed.lifespan}</span>
                </div>
                <button
                  className="inline-flex items-center gap-2 self-start font-medium text-sm transition-all hover:gap-3"
                  style={{ color: "var(--brown)" }}
                >
                  Подробнее о породе <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
