import Icon from "@/components/ui/icon";
import { REVIEWS, SALE_CONDITIONS, OWNER_PHOTOS, IMAGES } from "@/data/content";

const FALLBACK_OWNER = [IMAGES.owner, IMAGES.owner, IMAGES.owner, IMAGES.owner];

const ReviewCard = ({ r }: { r: typeof REVIEWS[number] }) => (
  <div className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl p-6 mx-3" style={{ border: "1px solid rgba(92,51,23,0.08)", boxShadow: "0 2px 12px rgba(92,51,23,0.06)" }}>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-semibold" style={{ background: "var(--cream-dark)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>
        {r.name[0]}
      </div>
      <div>
        <div className="text-sm font-semibold leading-tight" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{r.name}</div>
        <div className="text-xs" style={{ color: "rgba(92,51,23,0.4)", fontFamily: "'Golos Text', sans-serif" }}>{"date" in r ? String(r.date) : ""} · Покупатель</div>
      </div>
    </div>
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: r.stars }).map((_, i) => (
        <span key={i} style={{ color: "var(--gold)", fontSize: "14px" }}>★</span>
      ))}
    </div>
    <p className="text-xs mb-2 font-medium" style={{ color: "rgba(92,51,23,0.4)", fontFamily: "'Golos Text', sans-serif" }}>{r.dog}</p>
    <p className="text-sm leading-relaxed" style={{ color: "rgba(92,51,23,0.8)", fontFamily: "'Golos Text', sans-serif", display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.text}</p>
  </div>
);

export default function ReviewsSection() {
  const ownerPhotos = OWNER_PHOTOS.length > 0 ? OWNER_PHOTOS : FALLBACK_OWNER;
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="py-16 sm:py-24" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Отзывы</div>
          <h2 className="section-title">Счастливые хозяева</h2>
        </div>
      </div>

      {/* Бегущая строка */}
      <div className="overflow-hidden mb-12 sm:mb-16" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div className="flex reviews-marquee" style={{ width: "max-content" }}>
          {doubled.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reviews-marquee {
          animation: marquee 55s linear infinite;
        }
        .reviews-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Фото у хозяев */}
        <div className="rounded-3xl overflow-hidden mb-16" style={{ background: "white", border: "1px solid rgba(92,51,23,0.08)" }}>
          <div className="p-8 text-center border-b" style={{ borderColor: "rgba(92,51,23,0.08)" }}>
            <h3 className="font-display text-2xl font-semibold" style={{ color: "var(--brown)" }}>Фото наших питомцев у новых хозяев</h3>
            <p className="text-sm mt-2" style={{ color: "rgba(92,51,23,0.5)", fontFamily: "'Golos Text', sans-serif" }}>Делитесь своими фото — мы публикуем самые милые моменты</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {ownerPhotos.slice(0, 4).map((src, i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img src={src} alt={`Владелец ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(92,51,23,0.6) 0%, transparent 60%)" }}>
                  <span className="text-xs text-white font-medium" style={{ fontFamily: "'Golos Text', sans-serif" }}>Наш выпускник 🐾</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Условия продажи */}
        <div className="rounded-3xl p-6 sm:p-10 lg:p-14" style={{ background: "white" }}>
          <div className="text-center mb-10">
            <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Документы и гарантии</div>
            <h2 className="section-title">Условия продажи</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SALE_CONDITIONS.map((c) => (
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
  );
}