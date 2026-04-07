import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { IMAGES, KENNEL } from "@/data/content";

const PUPPY_PHOTO = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/bucket/5467aa2a-7462-481d-b6d2-91301e91339e.png";

const WHAT_YOU_GET = [
  { icon: "BookOpen",    text: "Ветеринарный паспорт животного" },
  { icon: "FileCheck",   text: "Справка от ветеринара о здоровье малыша" },
  { icon: "Cpu",         text: "Микрочип" },
  { icon: "FileText",    text: "Сертификат о легальном ввозе животного" },
  { icon: "Heart",       text: "Малыш полностью готов к жизни в любящей семье" },
];

const CHECKLIST = [
  "Всегда ли у вас есть время и место для малыша?",
  "Можете ли покрыть расходы на корм, уход или ветеринарное лечение?",
  "Совместимо ли содержание малыша с вашим образом жизни?",
  "Есть ли у вас или вашей семьи аллергии?",
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <NavBar />

      {/* Hero */}
      <section className="pt-24 pb-10 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>О нас</div>
          <h1 className="font-display font-semibold mb-4" style={{ color: "var(--brown)", fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}>
            Питомник с душой <em>и историей</em>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            {KENNEL.tagline}
          </p>
        </div>
      </section>

      {/* Main story */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative pt-6 pr-6 sm:pr-8">
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "1/1" }}>
                <img src={PUPPY_PHOTO} alt="Щенки питомника" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 right-0 rounded-2xl p-4 shadow-lg" style={{ background: "var(--cream-dark)" }}>
                <div className="font-display text-3xl sm:text-4xl font-semibold" style={{ color: "var(--brown)" }}>14+</div>
                <div className="text-xs sm:text-sm" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>лет любви<br />к породам</div>
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                Питомник «Из Поместья Мелешко» основан в 2012 году. Мы — небольшой семейный питомник, где каждый щенок воспитывается в доме, среди людей и получает максимум внимания и любви.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                Наши щенки растут в частном секторе, в отдельном доме с тёплыми полами. Ежедневно щенки бегают по улице, чтобы стать здоровой взрослой собакой. У щенков постоянное общение с детьми заводчиков, поэтому они адаптированы и любят людей.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                Все наши производители проходят обязательные ветеринарные проверки, имеют титулы и чистые родословные. Мы следим за здоровьем каждого щенка с первых дней жизни и сопровождаем новых хозяев на протяжении всей жизни питомца.
              </p>
              {/* Registrations */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
                  <Icon name="Award" size={16} style={{ color: "var(--pink)" }} />
                  Зарегистрированы в UCI Беларусь — <em>Iz Pomest'ya Meleshko</em>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
                  <Icon name="Award" size={16} style={{ color: "var(--pink)" }} />
                  Зарегистрированы в Германии в клубе IHR — <em>Loving Heart</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            <div className="p-3 sm:p-6 rounded-2xl bg-white shadow-sm">
              <div className="font-display text-xl sm:text-4xl font-semibold mb-1 leading-tight" style={{ color: "var(--brown)" }}>{KENNEL.yearsLabel}</div>
              <div className="text-xs sm:text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>работы</div>
            </div>
            <div className="p-3 sm:p-6 rounded-2xl bg-white shadow-sm">
              <div className="font-display text-xl sm:text-4xl font-semibold mb-1 leading-tight" style={{ color: "var(--brown)" }}>{KENNEL.happyFamilies}</div>
              <div className="text-xs sm:text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>семей</div>
            </div>
            <div className="p-3 sm:p-6 rounded-2xl bg-white shadow-sm">
              <div className="font-display text-xl sm:text-4xl font-semibold mb-1 leading-tight" style={{ color: "var(--brown)" }}>{KENNEL.breedsCount}</div>
              <div className="text-xs sm:text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>в семье</div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-2 text-center" style={{ color: "var(--brown)" }}>Приобретая щенка у нас,</h2>
          <p className="text-center mb-8 sm:mb-10 text-base" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>вы получите:</p>
          <div className="flex flex-col gap-3">
            {WHAT_YOU_GET.map((item) => (
              <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "var(--cream)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--pink)", opacity: 0.85 }}>
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <span className="text-base" style={{ color: "rgba(92,51,23,0.85)", fontFamily: "'Golos Text', sans-serif" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist before buying */}
      <section className="py-12 sm:py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3 text-center" style={{ color: "var(--brown)" }}>Перед покупкой подумайте</h2>
          <p className="text-center mb-10 text-base" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
            Щенок — это большая ответственность. Задайте себе несколько важных вопросов:
          </p>
          <div className="flex flex-col gap-4">
            {CHECKLIST.map((q) => (
              <div key={q} className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-sm">
                <Icon name="HelpCircle" size={20} className="flex-shrink-0 mt-0.5" style={{ color: "var(--pink)" }} />
                <span className="text-base" style={{ color: "rgba(92,51,23,0.8)", fontFamily: "'Golos Text', sans-serif" }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-semibold mb-4" style={{ color: "var(--brown)" }}>Мечтаете о питомце?</h2>
          <p className="mb-3 text-base" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            Напишите нам — мы развёрнуто ответим на все вопросы и поможем подобрать малыша близкого по вашему характеру.
          </p>
          <p className="mb-8 text-base font-medium" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
            WhatsApp: +375-33-676-67-48
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/375336766748"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Icon name="MessageCircle" size={18} />
              Написать в WhatsApp
            </a>
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