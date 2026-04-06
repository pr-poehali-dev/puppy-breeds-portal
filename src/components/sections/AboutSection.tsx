import Icon from "@/components/ui/icon";
import { IMAGES, KENNEL } from "@/data/content";

const ABOUT_FEATURES = [
  { icon: "Shield", text: "Все щенки с ветпаспортом и прививками" },
  { icon: "Award",  text: "Производители с титулами РКФ" },
  { icon: "Heart",  text: "Воспитание в домашних условиях" },
  { icon: "Phone",  text: "Поддержка после приобретения" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "1/1" }}>
              <img src={IMAGES.about} alt="Наши щенки" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 rounded-2xl p-5 shadow-lg" style={{ background: "var(--cream-dark)" }}>
              <div className="font-display text-4xl font-semibold" style={{ color: "var(--brown)" }}>14+</div>
              <div className="text-sm" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>лет любви<br />к породам</div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>О нас</div>
            <h2 className="section-title mb-6">Питомник с душой<br /><em>и историей</em></h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
              {KENNEL.aboutText1}
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
              {KENNEL.aboutText2}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_FEATURES.map((item) => (
                <div key={item.text} className="flex gap-3 items-start p-4 rounded-xl" style={{ background: "var(--cream)" }}>
                  <Icon name={item.icon} size={20} className="mt-0.5 flex-shrink-0" style={{ color: "var(--brown)" }} />
                  <span className="text-sm" style={{ color: "rgba(92,51,23,0.8)", fontFamily: "'Golos Text', sans-serif" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}