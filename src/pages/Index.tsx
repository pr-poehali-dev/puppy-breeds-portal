import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/bucket/84d0f242-164a-4dc6-83bb-b32303cc8d2e.png";
const IMG_HERO = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/files/e141e916-3cf3-4a2a-93d8-c2a528532e22.jpg";
const IMG_PUPPY = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/files/99d8b0b3-6041-4fc5-a07f-16be722bd796.jpg";
const IMG_OWNER = "https://cdn.poehali.dev/projects/bc8ff6ee-f80d-483c-9941-b013281e7ebf/files/18c560f9-7eff-4625-a540-05deb8e7945d.jpg";

const navItems = [
  { label: "Главная", id: "home" },
  { label: "О питомнике", id: "about" },
  { label: "Породы", id: "breeds" },
  { label: "Щенки", id: "puppies" },
  { label: "Родители", id: "parents" },
  { label: "Галерея", id: "gallery" },
  { label: "Отзывы", id: "reviews" },
  { label: "Контакты", id: "contacts" },
];

const breeds = [
  {
    name: "Мальтипу",
    emoji: "🤍",
    desc: "Нежное сочетание мальтезе и пуделя. Гипоаллергенная шёрстка, интеллект пуделя и бесконечная любовь мальтезе.",
    traits: ["Гипоаллергенный", "Умный", "Ласковый"],
    weight: "2–4 кг",
    color: "#FAF0F2",
  },
  {
    name: "Пудель",
    emoji: "🧡",
    desc: "Одна из умнейших пород в мире. Элегантный, игривый, преданный — идеальный компаньон для всей семьи.",
    traits: ["Очень умный", "Активный", "Без линьки"],
    weight: "2–7 кг",
    color: "#FFF8F0",
  },
  {
    name: "Йоркширский терьер",
    emoji: "💛",
    desc: "Маленький лев с шёлковой шёрсткой. Энергичный, смелый и беззаветно преданный своему хозяину.",
    traits: ["Смелый", "Преданный", "Компактный"],
    weight: "2–3 кг",
    color: "#FFFFF0",
  },
  {
    name: "Бивер Йорк",
    emoji: "🤎",
    desc: "Редкая порода с трёхцветным окрасом. Мягкий характер, шёлковая шерсть и неизменная жизнерадостность.",
    traits: ["Редкий окрас", "Мягкий", "Жизнерадостный"],
    weight: "2–3.5 кг",
    color: "#F5F0FA",
  },
];

const puppies = [
  { name: "Карамель", breed: "Мальтипу", age: "2.5 месяца", sex: "♀", price: "от 45 000 ₽", status: "Свободен", color: "#FFF0F0" },
  { name: "Барни", breed: "Пудель той", age: "3 месяца", sex: "♂", price: "от 40 000 ₽", status: "Свободен", color: "#FFF8F0" },
  { name: "Лотос", breed: "Бивер Йорк", age: "2 месяца", sex: "♀", price: "от 50 000 ₽", status: "Резерв", color: "#F5F0FA" },
  { name: "Чип", breed: "Йорк", age: "2.5 месяца", sex: "♂", price: "от 35 000 ₽", status: "Свободен", color: "#FFFFF0" },
];

const parents = [
  { name: "Белла", role: "Мама", breed: "Мальтипу", desc: "Чемпион России, титулованная красавица с нежным характером", awards: "Ch. RUS, Multi BIS" },
  { name: "Граф", role: "Папа", breed: "Пудель той", desc: "Многократный победитель выставок, здоровый и темпераментный", awards: "Int. Ch., BIS Winner" },
  { name: "Лейла", role: "Мама", breed: "Йорк", desc: "Производительница высшего класса, нежная мама и чемпионка", awards: "Ch. RUS, Ch. UA" },
];

const reviews = [
  {
    name: "Анна Котова",
    city: "Москва",
    text: "Взяли щеночка мальтипу — это просто чудо! Питомник профессиональный, все документы в порядке, щенок здоровый и воспитанный. Очень рекомендую!",
    dog: "Мальтипу, Бублик",
    stars: 5,
  },
  {
    name: "Елена Морозова",
    city: "Санкт-Петербург",
    text: "Давно мечтала о пуделе. Нашла этот питомник и не пожалела ни разу. Заводчики настоящие профессионалы и просто замечательные люди!",
    dog: "Пудель той, Мими",
    stars: 5,
  },
  {
    name: "Светлана Иванова",
    city: "Краснодар",
    text: "Наш йорк Принц — лучшее, что случалось в нашей семье. Растёт здоровым, весёлым. Огромная благодарность за такого малыша!",
    dog: "Йорк, Принц",
    stars: 5,
  },
];

const saleConditions = [
  { icon: "FileCheck", title: "Ветеринарный паспорт", desc: "Все щенки отдаются с международным ветеринарным паспортом и прививками по возрасту" },
  { icon: "Shield", title: "Гарантия здоровья", desc: "Предоставляем гарантию здоровья на 1 год. Все щенки осмотрены ветеринаром" },
  { icon: "Award", title: "Документы РКФ", desc: "Щенки продаются с метрикой РКФ. По запросу помогаем с оформлением родословной" },
  { icon: "Heart", title: "Поддержка после продажи", desc: "Консультируем по вопросам ухода, питания и воспитания на протяжении всей жизни питомца" },
  { icon: "MapPin", title: "Доставка по России", desc: "Организуем безопасную доставку щенка в любой город России" },
  { icon: "Phone", title: "Договор купли-продажи", desc: "Работаем официально, заключаем договор и предоставляем все необходимые документы" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBreed, setActiveBreed] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: "rgba(250,246,240,0.92)", borderColor: "rgba(92,51,23,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-display text-lg font-semibold cursor-pointer" style={{ color: "var(--brown)" }} onClick={() => scrollTo("home")}>Iz Pomest'ya Meleshko</span>
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((n) => (
              <button key={n.id} className="nav-link" onClick={() => scrollTo(n.id)}>{n.label}</button>
            ))}
          </div>
          <button className="hidden lg:block btn-primary text-sm py-2.5 px-6" onClick={() => scrollTo("contacts")}>
            Связаться
          </button>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--brown)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ background: "var(--cream)", borderColor: "rgba(92,51,23,0.1)" }}>
            {navItems.map((n) => (
              <button key={n.id} className="nav-link text-left" onClick={() => { scrollTo(n.id); setMenuOpen(false); }}>{n.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16" style={{ background: "linear-gradient(135deg, #FAF6F0 0%, #F5EAD8 50%, #FAF0F2 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Цветы и листья */}
          <div className="absolute text-6xl opacity-20 animate-float" style={{ top: "8%",  right: "6%" }}>🌸</div>

          <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "35%", right: "4%", animationDelay: "0.6s" }}>🌼</div>
          <div className="absolute text-5xl opacity-15 animate-float" style={{ top: "15%", right: "18%",animationDelay: "2s" }}>🍂</div>
          <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "55%", left: "6%",  animationDelay: "1.8s" }}>🌺</div>
          <div className="absolute text-5xl opacity-15 animate-float" style={{ top: "50%", right: "7%", animationDelay: "0.4s" }}>🍃</div>
          <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "70%", left: "8%",  animationDelay: "2.5s" }}>🌻</div>
          <div className="absolute text-5xl opacity-15 animate-float" style={{ top: "75%", right: "3%", animationDelay: "1.0s" }}>🍁</div>
          <div className="absolute text-4xl opacity-15 animate-float" style={{ top: "30%", left: "6%",  animationDelay: "3s"   }}>🌿</div>
          <div className="absolute text-3xl opacity-20 animate-float" style={{ top: "65%", right: "12%",animationDelay: "1.5s" }}>🌷</div>
          <div className="absolute text-4xl opacity-15 animate-float" style={{ top: "85%", left: "20%", animationDelay: "0.9s" }}>🍂</div>
          <div className="absolute text-3xl opacity-15 animate-float" style={{ top: "10%", left: "20%", animationDelay: "2.2s" }}>🌾</div>
          <div className="absolute text-4xl opacity-20 animate-float" style={{ top: "42%", right: "15%",animationDelay: "1.7s" }}>🪻</div>
          <div className="absolute text-3xl opacity-15 animate-float" style={{ top: "88%", right: "20%",animationDelay: "0.3s" }}>🌼</div>

        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(92,51,23,0.08)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
              <span>🐾</span> Питомник с любовью с 2015 года
            </div>
            <img src={LOGO_URL} alt="Из Поместья Мелешко" className="mb-2" style={{ maxWidth: 1000, width: "100%", display: "block" }} />
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(92,51,23,0.75)", maxWidth: 480, fontFamily: "'Golos Text', sans-serif" }}>
              Разводим мальтипу, пуделей, йоркширских терьеров и бивер йорк. Каждый щенок рождается с любовью — здоровым, воспитанным и готовым стать лучшим другом.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary" onClick={() => scrollTo("puppies")}>Смотреть щенков</button>
              <button className="btn-outline" onClick={() => scrollTo("about")}>О питомнике</button>
            </div>
            <div className="flex gap-8 mt-10">
              {[["200+", "счастливых семей"], ["9 лет", "опыта разведения"], ["4 породы", "в питомнике"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-semibold" style={{ color: "var(--brown)" }}>{num}</div>
                  <div className="text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-fade-in delay-300 relative">
            <div className="text-6xl opacity-30 animate-float absolute z-10" style={{ top: "8px", left: "-98px", animationDelay: "1.2s" }}>🍁</div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
              <img src={IMG_HERO} alt="Щенки питомника" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(92,51,23,0.2) 0%, transparent 60%)" }} />
            </div>
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 animate-fade-in delay-500">
              <div className="font-display text-lg" style={{ color: "var(--brown)" }}>Есть свободные щенки</div>
              <div className="text-sm" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>Уточните наличие у нас</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "1/1" }}>
                <img src={IMG_PUPPY} alt="Наши щенки" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 rounded-2xl p-5 shadow-lg" style={{ background: "var(--cream-dark)" }}>
                <div className="font-display text-4xl font-semibold" style={{ color: "var(--brown)" }}>9+</div>
                <div className="text-sm" style={{ color: "var(--brown-light)", fontFamily: "'Golos Text', sans-serif" }}>лет любви<br/>к породам</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>О нас</div>
              <h2 className="section-title mb-6">Питомник с душой<br /><em>и историей</em></h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                Питомник «Из Поместья Мелешко» основан в 2015 году. Мы — небольшой семейный питомник, где каждый щенок воспитывается в доме, среди людей и получает максимум внимания и любви.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>
                Все наши производители проходят обязательные ветеринарные проверки, имеют титулы и чистые родословные. Мы следим за здоровьем каждого щенка с первых дней жизни и сопровождаем новых хозяев на протяжении всей жизни питомца.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield", text: "Все щенки с ветпаспортом и прививками" },
                  { icon: "Award", text: "Производители с титулами РКФ" },
                  { icon: "Heart", text: "Воспитание в домашних условиях" },
                  { icon: "Phone", text: "Поддержка после приобретения" },
                ].map((item) => (
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

      {/* BREEDS */}
      <section id="breeds" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Наши породы</div>
            <h2 className="section-title">Четыре породы —<br /><em>одна любовь</em></h2>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {breeds.map((b, i) => (
              <button key={b.name} onClick={() => setActiveBreed(i)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeBreed === i ? "var(--brown)" : "white",
                  color: activeBreed === i ? "var(--cream)" : "var(--brown)",
                  border: "1.5px solid var(--brown)",
                  boxShadow: activeBreed === i ? "0 4px 16px rgba(92,51,23,0.2)" : "none",
                  fontFamily: "'Golos Text', sans-serif"
                }}>
                {b.emoji} {b.name}
              </button>
            ))}
          </div>
          <div className="card-kennel p-8 lg:p-12" style={{ background: breeds[activeBreed].color }}>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-5xl mb-4">{breeds[activeBreed].emoji}</div>
                <h3 className="font-display text-4xl font-semibold mb-4" style={{ color: "var(--brown)" }}>{breeds[activeBreed].name}</h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>{breeds[activeBreed].desc}</p>
                <div className="flex gap-2 flex-wrap mb-6">
                  {breeds[activeBreed].traits.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2" style={{ color: "var(--brown-light)" }}>
                  <Icon name="Scale" size={16} />
                  <span className="text-sm" style={{ fontFamily: "'Golos Text', sans-serif" }}>Вес взрослой собаки: {breeds[activeBreed].weight}</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={IMG_PUPPY} alt={breeds[activeBreed].name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUPPIES */}
      <section id="puppies" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Щенки</div>
            <h2 className="section-title">Доступные малыши</h2>
            <p className="text-base mt-4" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>Актуальность наличия уточняйте у нас — обновляем регулярно</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {puppies.map((p) => (
              <div key={p.name} className="card-kennel" style={{ background: p.color }}>
                <div className="aspect-square relative overflow-hidden rounded-t-2xl">
                  <img src={IMG_PUPPY} alt={p.name} className="w-full h-full object-cover" />
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

      {/* PARENTS */}
      <section id="parents" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Производители</div>
            <h2 className="section-title">Наши родители</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {parents.map((p) => (
              <div key={p.name} className="card-kennel bg-white" style={{ paddingBottom: "24px" }}>
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-t-2xl">
                    <img src={IMG_PUPPY} alt={p.name} className="w-full h-full object-cover" />
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

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Галерея</div>
            <h2 className="section-title">Наши <em>малыши</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{ aspectRatio: "1/1" }}>
                <img src={i % 3 === 0 ? IMG_HERO : i % 3 === 1 ? IMG_PUPPY : IMG_OWNER} alt={`Фото ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(92,51,23,0.25)" }}>
                  <Icon name="ZoomIn" size={28} style={{ color: "white" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>Больше фото — в нашем Instagram и ВКонтакте</p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Отзывы</div>
            <h2 className="section-title">Счастливые хозяева</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {reviews.map((r) => (
              <div key={r.name} className="card-kennel bg-white p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} style={{ color: "var(--gold)" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "rgba(92,51,23,0.75)", fontFamily: "'Golos Text', sans-serif" }}>"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(92,51,23,0.1)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "var(--cream-dark)" }}>🐾</div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{r.city} · {r.dog}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Owner Photos Block */}
          <div className="rounded-3xl overflow-hidden mb-16" style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}>
            <div className="p-8 text-center border-b" style={{ borderColor: "rgba(92,51,23,0.08)" }}>
              <h3 className="font-display text-2xl font-semibold" style={{ color: "var(--brown)" }}>Фото наших питомцев у новых хозяев</h3>
              <p className="text-sm mt-2" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>Делитесь своими фото — мы публикуем самые милые моменты</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="relative group cursor-pointer overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img src={IMG_OWNER} alt={`Владелец ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4"
                    style={{ background: "linear-gradient(to top, rgba(92,51,23,0.6) 0%, transparent 60%)" }}>
                    <span className="text-xs text-white font-medium" style={{ fontFamily: "'Golos Text', sans-serif" }}>Наш выпускник 🐾</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sale Conditions */}
          <div className="rounded-3xl p-10 lg:p-14" style={{ background: "white" }}>
            <div className="text-center mb-10">
              <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Документы и гарантии</div>
              <h2 className="section-title">Условия продажи</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saleConditions.map((c) => (
                <div key={c.title} className="flex gap-4 p-5 rounded-2xl" style={{ background: "var(--cream)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(92,51,23,0.1)" }}>
                    <Icon name={c.icon} size={20} style={{ color: "var(--brown)" }} />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold mb-1" style={{ color: "var(--brown)" }}>{c.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(92,51,23,0.7)", fontFamily: "'Golos Text', sans-serif" }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--brown)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Контакты</div>
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--cream)", fontWeight: 500 }}>
            Готовы познакомиться<br /><em>с вашим малышом?</em>
          </h2>
          <p className="text-base mb-10" style={{ color: "rgba(250,246,240,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
            Напишите нам — ответим на все вопросы, расскажем о доступных щенках и поможем выбрать идеального питомца
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (000) 000-00-00", sub: "Звонки и WhatsApp" },
              { icon: "MessageCircle", label: "Telegram", value: "@kennel_meleshko", sub: "Напишите нам" },
              { icon: "Instagram", label: "Instagram", value: "@iz_pomestya", sub: "Фото и видео щенков" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl p-6 text-center" style={{ background: "rgba(250,246,240,0.08)", border: "1px solid rgba(250,246,240,0.15)" }}>
                <Icon name={c.icon} size={24} className="mx-auto mb-3" style={{ color: "var(--pink)" }} />
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(250,246,240,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{c.label}</div>
                <div className="font-display text-lg font-semibold mb-1" style={{ color: "var(--cream)" }}>{c.value}</div>
                <div className="text-sm" style={{ color: "rgba(250,246,240,0.6)", fontFamily: "'Golos Text', sans-serif" }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8 text-left max-w-xl mx-auto" style={{ background: "rgba(250,246,240,0.07)", border: "1px solid rgba(250,246,240,0.12)" }}>
            <h3 className="font-display text-xl font-semibold mb-5" style={{ color: "var(--cream)" }}>Написать нам</h3>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                style={{ background: "rgba(250,246,240,0.1)", borderColor: "rgba(250,246,240,0.2)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }} />
              <input type="tel" placeholder="Телефон или мессенджер"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                style={{ background: "rgba(250,246,240,0.1)", borderColor: "rgba(250,246,240,0.2)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }} />
              <textarea rows={3} placeholder="Ваш вопрос или интересующая порода"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none"
                style={{ background: "rgba(250,246,240,0.1)", borderColor: "rgba(250,246,240,0.2)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }} />
              <button className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "var(--cream)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ background: "var(--brown-dark)", borderColor: "rgba(250,246,240,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <img src={LOGO_URL} alt="Из Поместья Мелешко" className="h-10" />
          <p className="text-sm text-center" style={{ color: "rgba(250,246,240,0.4)", fontFamily: "'Golos Text', sans-serif" }}>
            © 2024 Питомник «Из Поместья Мелешко» · Мальтипу, пудели, йорки, бивер йорк
          </p>
          <div className="flex gap-4">
            {["Instagram", "MessageCircle", "Phone"].map((icon) => (
              <button key={icon} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(250,246,240,0.08)", border: "1px solid rgba(250,246,240,0.15)" }}>
                <Icon name={icon} size={16} style={{ color: "rgba(250,246,240,0.6)" }} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}