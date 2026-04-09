import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface FaceOverlay {
  top: string;
  left: string;
  size: string;
  emoji: string;
}

interface OwnerPhoto {
  url: string;
  alt: string;
  faces: FaceOverlay[];
}

const OWNER_PHOTOS: OwnerPhoto[] = [
  {
    url: "https://cdn.poehali.dev/files/2a0684f4-b56a-4ab6-8974-5b7b771eb6f7.jpg",
    alt: "Кавапу у хозяина на руках",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/62d4f30d-75af-4565-9167-22d911c2b5a7.jpg",
    alt: "Маленький щенок пудель",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/e364cd75-d03b-4b46-bd29-d3252f97e368.jpg",
    alt: "Щенок в машине у хозяина",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/4e1cad60-4b7e-4371-b218-121445a34cc3.jpg",
    alt: "Щенок кавапу у хозяйки",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/05ac89e7-d41e-4a37-93c5-43b6de2085f5.jpg",
    alt: "Щенок у грумера",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/514a2af1-e713-481b-835d-e039f20f73d3.png",
    alt: "Девочка с собакой у ёлки",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/15ff0374-8d7d-4634-95e6-354f9a75f6a5.png",
    alt: "Девочка с щенком йорка",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/af828416-0f6c-418f-a0f5-f5f07fee048e.png",
    alt: "Молодой человек со щенком на улице",
    faces: [],
  },
];

export default function GallerySection() {
  const navigate = useNavigate();

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Галерея</div>
          <h2 className="section-title">Наши питомцы у <em>новых хозяев</em></h2>
          <p className="mt-3 text-base" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
            Щенки из нашего питомника нашли свои семьи
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {OWNER_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl group cursor-pointer flex-shrink-0"
              style={{ aspectRatio: "1/1", width: "220px" }}
              onClick={() => navigate("/gallery/owners")}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {photo.faces.map((face, fi) => (
                <div
                  key={fi}
                  className="absolute pointer-events-none select-none flex items-center justify-center"
                  style={{
                    top: face.top,
                    left: face.left,
                    width: face.size,
                    fontSize: `calc(${face.size} * 0.7)`,
                    lineHeight: 1,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                  }}
                >
                  {face.emoji}
                </div>
              ))}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(92,51,23,0.25)" }}
              >
                <Icon name="ZoomIn" size={28} style={{ color: "white" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/gallery/owners")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:opacity-80"
            style={{ background: "var(--pink)", color: "white", fontFamily: "'Golos Text', sans-serif" }}
          >
            Смотреть все фото <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}