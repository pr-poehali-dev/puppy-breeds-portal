import Icon from "@/components/ui/icon";
import { GALLERY_PHOTOS, IMAGES } from "@/data/content";

// Запасные фото если галерея пустая
const FALLBACK_PHOTOS = [IMAGES.hero, IMAGES.puppy, IMAGES.owner];

export default function GallerySection() {
  // Берём фото из content.ts, если пусто — показываем заглушки
  const photos = GALLERY_PHOTOS.length > 0
    ? GALLERY_PHOTOS
    : Array.from({ length: 8 }, (_, i) => FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length]);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Галерея</div>
          <h2 className="section-title">Наши <em>малыши</em></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl group cursor-pointer" style={{ aspectRatio: "1/1" }}>
              <img src={src} alt={`Фото ${i + 1}`}
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
  );
}
