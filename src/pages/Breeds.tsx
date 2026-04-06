import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { BREEDS, MALTIPOO_SUBTYPES, YORK_SUBTYPES, IMAGES } from "@/data/content";

export default function Breeds() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      <NavBar />

      {/* TITLE */}
      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)" }}>Наши породы</div>
          <h1 className="section-title mb-4 whitespace-nowrap">Три породы — <em>одна любовь</em></h1>
          <p className="text-base" style={{ color: "rgba(92,51,23,0.6)" }}>
            Мы разводим только те породы, в которых уверены: здоровые линии, чистые родословные и характеры, проверенные годами
          </p>
        </div>
      </div>

      {/* BREED CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-6">
        {BREEDS.map((breed) => (
          <div
            key={breed.slug}
            className="rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
            style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
            onClick={() => navigate(`/breeds/${breed.slug}`)}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-3" style={{ background: breed.color }}>
              <h2 className="font-display text-2xl font-semibold leading-tight" style={{ color: "var(--brown)" }}>
                {breed.name}
              </h2>
              <span className="text-2xl">{breed.emoji}</span>
            </div>
            <div className="relative overflow-hidden" style={{ height: 220 }}>
              <img
                src={breed.image || IMAGES.puppy}
                alt={breed.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-6" style={{ background: breed.color }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.72)" }}>
                {breed.desc}
              </p>
              <div className="flex gap-1.5 flex-wrap mb-4">
                {breed.traits.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)" }}>{t}</span>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-1.5 font-medium text-sm transition-all group-hover:gap-2.5"
                style={{ color: "var(--brown)" }}>
                Подробнее <Icon name="ArrowRight" size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUBTYPES SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <div className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "var(--pink)" }}>Подвиды мальтипу</div>
          <h2 className="font-display text-3xl font-semibold" style={{ color: "var(--brown)" }}>
            Мальтипу и его родственники
          </h2>
          <p className="mt-2 text-base" style={{ color: "rgba(92,51,23,0.6)" }}>
            Гибридные породы с участием пуделя — умные, ласковые и почти без линьки
          </p>
        </div>

        <SubtypeGrid subtypes={MALTIPOO_SUBTYPES} navigate={navigate} />
      </div>

      {/* YORK SUBTYPES SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <div className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "var(--pink)" }}>Подвиды йорка</div>
          <h2 className="font-display text-3xl font-semibold" style={{ color: "var(--brown)" }}>
            Йорк и его разновидности
          </h2>
          <p className="mt-2 text-base" style={{ color: "rgba(92,51,23,0.6)" }}>
            Маленькие, смелые и невероятно преданные — йорки в классическом и редком исполнении
          </p>
        </div>
        <SubtypeGrid subtypes={YORK_SUBTYPES} navigate={navigate} />
      </div>
    </div>
  );
}

function SubtypeGrid({ subtypes, navigate }: { subtypes: typeof MALTIPOO_SUBTYPES; navigate: (path: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
      {subtypes.map((sub) => (
        <div
          key={sub.slug}
          className="rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
          style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
          onClick={() => navigate(`/breeds/sub/${sub.slug}`)}
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ background: sub.color }}>
            <h3 className="font-display text-xl font-semibold" style={{ color: "var(--brown)" }}>
              {sub.name}
            </h3>
            <span className="text-xl">{sub.emoji}</span>
          </div>
          <div className="overflow-hidden" style={{ height: 180 }}>
            <img
              src={sub.image || IMAGES.puppy}
              alt={sub.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col flex-1 p-5" style={{ background: sub.color }}>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(92,51,23,0.72)" }}>
              {sub.shortDesc}
            </p>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {sub.traits.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)" }}>{t}</span>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-1.5 font-medium text-sm transition-all group-hover:gap-2.5"
              style={{ color: "var(--brown)" }}>
              Подробнее <Icon name="ArrowRight" size={15} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}