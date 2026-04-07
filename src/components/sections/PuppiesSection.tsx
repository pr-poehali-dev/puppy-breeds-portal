import { PUPPIES, IMAGES } from "@/data/content";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function PuppiesSection() {
  return (
    <section id="puppies" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Щенки</div>
          <h2 className="section-title">Доступные малыши</h2>
          <p className="text-base mt-4" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>Актуальность наличия уточняйте у нас — обновляем регулярно</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PUPPIES.map((p) => (
            <div key={p.name} className="card-kennel" style={{ background: p.color }}>
              <div className="aspect-square relative overflow-hidden rounded-t-2xl">
                <img src={p.image || IMAGES.puppy} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: p.status === "Резерв" ? "rgba(232,164,176,0.9)" : "rgba(92,51,23,0.85)", color: "white", fontFamily: "'Golos Text', sans-serif" }}>
                  {p.status}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-semibold" style={{ color: "var(--brown)" }}>{p.name} {p.sex}</h3>
                  <span className="text-xs" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{p.age}</span>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>{p.breed}</p>
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg font-semibold" style={{ color: "var(--brown)" }}>{p.price}</span>
                  <button className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
                    onClick={() => scrollTo("contacts")}>
                    Узнать →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="btn-outline" onClick={() => scrollTo("contacts")}>Узнать о всех щенках</button>
        </div>
      </div>
    </section>
  );
}