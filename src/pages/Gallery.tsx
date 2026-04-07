import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/sections/NavBar";
import { MALTIPOO_SUBTYPES, YORK_SUBTYPES, BREEDS, IMAGES } from "@/data/content";

const poodle = BREEDS.find((b) => b.slug === "toy-poodle")!;
const poodleCard = { slug: poodle.slug, name: poodle.name, emoji: poodle.emoji, color: poodle.color, image: poodle.image, traits: poodle.traits, galleryPhotos: poodle.galleryPhotos };
const ALL_BREEDS = [...MALTIPOO_SUBTYPES, ...YORK_SUBTYPES, poodleCard];

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>
      <Helmet>
        <title>Галерея щенков — Мальтипу, Йорк, Пудель, Бивер-йорк | Питомник Из Поместья Мелешко</title>
        <meta name="description" content="Фото щенков мальтипу, йоркширского терьера, бивер-йорка, той-пуделя, кавапу и пушона из питомника «Из Поместья Мелешко». Смотрите реальные фото наших малышей с доставкой по России, Беларуси и СНГ." />
        <meta property="og:title" content="Галерея щенков питомника «Из Поместья Мелешко»" />
        <meta property="og:description" content="Фото мальтипу, йорка, бивер-йорка, той-пуделя — реальные щенки с документами UCI." />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <NavBar />

      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)" }}>Галерея</div>
          <h1 className="section-title mb-4">Фото наших <em>малышей</em></h1>
          <p className="text-base" style={{ color: "rgba(92,51,23,0.6)" }}>
            Выбери породу и смотри фотографии наших щенков
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {ALL_BREEDS.map((breed) => (
            <div
              key={breed.slug}
              className="rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
              style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}
              onClick={() => navigate(`/gallery/${breed.slug}`)}
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ background: breed.color }}>
                <h3 className="font-display text-xl font-semibold" style={{ color: "var(--brown)" }}>
                  {breed.name}
                </h3>
                <span className="text-xl">{breed.emoji}</span>
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={breed.image || IMAGES.puppy}
                  alt={`Щенок ${breed.name} — питомник Из Поместья Мелешко`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-5" style={{ background: breed.color }}>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {breed.traits.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)" }}>{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-1.5 font-medium text-sm transition-all group-hover:gap-2.5"
                  style={{ color: "var(--brown)" }}>
                  Смотреть фото <Icon name="ArrowRight" size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl p-8 sm:p-12" style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}>
          <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: "var(--brown)" }}>
            Фото щенков из питомника «Из Поместья Мелешко»
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-sm leading-relaxed" style={{ color: "rgba(92,51,23,0.7)" }}>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--brown)" }}>Купить щенка мальтипу с документами</h3>
              <p>Мальтипу — гипоаллергенная порода, которая не линяет и идеально подходит для семей с детьми и аллергиками. В нашем питомнике вы можете посмотреть фото щенков мальтипу, кавапу и пушона — все малыши воспитаны в домашних условиях и передаются с документами UCI.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--brown)" }}>Купить щенка йорка и бивер-йорка</h3>
              <p>Йоркширский терьер и бивер-йорк — одни из самых популярных декоративных пород. Компактные, смелые, не линяют. Фото щенков йорка и бивер-йорка с уникальным трёхцветным окрасом — в нашей галерее. Доставка по России, Беларуси и СНГ.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--brown)" }}>Той-пудель — фото щенков</h3>
              <p>Той-пудель входит в топ-2 умнейших пород мира. Гипоаллергенный, обучаемый, преданный компаньон. Смотрите фотографии наших щенков той-пуделя — рыжие, абрикосовые, шоколадные окрасы от проверенных производителей с документами.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--brown)" }}>Семейный питомник в Беларуси</h3>
              <p>Питомник «Из Поместья Мелешко» — это домашнее разведение декоративных пород с документами РКФ и UCI. Все щенки социализированы с первых дней жизни, вакцинированы и микрочипированы. Возможна доставка в любой город России, Украины и СНГ.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}