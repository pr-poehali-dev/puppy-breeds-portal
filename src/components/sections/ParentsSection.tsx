import Icon from "@/components/ui/icon";
import { PARENTS, IMAGES } from "@/data/content";

export default function ParentsSection() {
  return (
    <section id="parents" className="py-24" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Производители</div>
          <h2 className="section-title">Наши родители</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PARENTS.map((p) => (
            <div key={p.name} className="card-kennel bg-white" style={{ paddingBottom: "24px" }}>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-t-2xl">
                  <img src={p.image || IMAGES.puppy} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-3 left-5 px-3 py-1.5 rounded-full text-sm font-medium shadow-md"
                  style={{ background: "var(--brown)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
                  {p.role}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: "var(--brown)" }}>{p.name}</h3>
                <p className="text-sm mb-3" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>{p.breed}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>{p.desc}</p>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={14} style={{ color: "var(--gold)" }} />
                  <span className="text-xs font-medium" style={{ color: "var(--gold)", fontFamily: "'Golos Text', sans-serif" }}>{p.awards}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
