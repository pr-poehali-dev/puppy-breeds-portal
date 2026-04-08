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
    url: "https://cdn.poehali.dev/files/f011f403-7430-498c-9909-8e6e1ee36731.jpg",
    alt: "Щенок мальтипу у новых хозяев",
    faces: [{ top: "2%", left: "22%", size: "52%", emoji: "😊" }],
  },
  {
    url: "https://cdn.poehali.dev/files/2495a535-e7ad-4c42-9695-2cbe73bba2b4.jpg",
    alt: "Девочка с щенком мальтипу",
    faces: [{ top: "1%", left: "20%", size: "45%", emoji: "🥰" }],
  },
  {
    url: "https://cdn.poehali.dev/files/7843724d-7ec1-4403-9a76-e1fa0987a65c.jpg",
    alt: "Щенок с хозяином",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/e776ae4a-b405-4017-853c-f90fb27fe43a.jpg",
    alt: "Девочка целует щенка",
    faces: [{ top: "0%", left: "25%", size: "55%", emoji: "😄" }],
  },
  {
    url: "https://cdn.poehali.dev/files/89b64eda-da67-4392-b1af-f48e5d80ec6e.jpg",
    alt: "Щенок мальтипу белый на пляже",
    faces: [{ top: "0%", left: "45%", size: "35%", emoji: "😎" }],
  },
  {
    url: "https://cdn.poehali.dev/files/b17ea63b-f8a5-4af6-b8e1-92a865780520.jpg",
    alt: "Маленький щенок пудель",
    faces: [],
  },
  {
    url: "https://cdn.poehali.dev/files/a7598585-2a66-418e-bd8b-070478a19d44.jpg",
    alt: "Девочка с щенком йорка",
    faces: [{ top: "1%", left: "18%", size: "50%", emoji: "🤩" }],
  },
  {
    url: "https://cdn.poehali.dev/files/de64a2a4-5d5a-4f39-a909-a9f2a30632a7.jpg",
    alt: "Девочка с собакой у ёлки",
    faces: [{ top: "28%", left: "48%", size: "32%", emoji: "😁" }],
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OWNER_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{ aspectRatio: "1/1" }}
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