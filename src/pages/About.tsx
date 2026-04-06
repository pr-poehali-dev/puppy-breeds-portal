import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { IMAGES, KENNEL } from "@/data/content";

const FEATURES = [
  { icon: "Shield", text: "Все щенки с ветпаспортом и прививками" },
  { icon: "Award",  text: "Производители с титулами РКФ" },
  { icon: "Heart",  text: "Воспитание в домашних условиях" },
  { icon: "Phone",  text: "Поддержка после приобретения" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>О нас</div>
          <h1 className="font-display text-5xl font-semibold mb-6" style={{ color: "var(--brown)" }}>
            Питомник с душой<br /><em>и историей</em>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            {KENNEL.tagline}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <img src={IMAGES.about} alt="Питомник" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 rounded-2xl p-5 shadow-lg" style={{ background: "var(--cream-dark)" }}>
                <div className="font-display text-4xl font-semibold" style={{ color: "var(--brown)" }}>14+</div>
                <div className="text-sm" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>лет любви<br />к породам</div>
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                {KENNEL.aboutText1}
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                {KENNEL.aboutText2}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {FEATURES.map((item) => (
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

      {/* Stats */}
      <section className="py-12" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <div className="font-display text-4xl font-semibold mb-1" style={{ color: "var(--brown)" }}>{KENNEL.yearsLabel}</div>
              <div className="text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>работы</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <div className="font-display text-4xl font-semibold mb-1" style={{ color: "var(--brown)" }}>{KENNEL.happyFamilies}</div>
              <div className="text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>счастливых семей</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <div className="font-display text-4xl font-semibold mb-1" style={{ color: "var(--brown)" }}>{KENNEL.breedsCount}</div>
              <div className="text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>в нашей семье</div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner photo */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
            <img src={IMAGES.owner} alt="Владелец питомника" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-3" style={{ color: "var(--brown)" }}>Владелец питомника</h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            Здесь появится текст о владельце — добавьте его в следующем сообщении.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-semibold mb-4" style={{ color: "var(--brown)" }}>Хотите познакомиться?</h2>
          <p className="mb-8 text-base" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            Напишите нам — расскажем о доступных щенках и ответим на любые вопросы.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary" onClick={() => navigate("/#contacts")}>Связаться с нами</button>
            <button
              className="px-6 py-3 rounded-full font-medium text-sm border transition-all hover:shadow-md"
              style={{ color: "var(--brown)", borderColor: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}
              onClick={() => navigate("/breeds")}
            >
              Смотреть породы
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
