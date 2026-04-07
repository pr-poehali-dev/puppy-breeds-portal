import Icon from "@/components/ui/icon";
import { IMAGES, KENNEL } from "@/data/content";

export default function FooterSection() {
  return (
    <footer className="py-8 border-t" style={{ background: "var(--brown-dark)", borderColor: "rgba(250,246,240,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <img src={IMAGES.logo} alt={KENNEL.name} className="h-10" />
        <p className="text-xs sm:text-sm text-center px-2 break-words" style={{ color: "rgba(250,246,240,0.4)", fontFamily: "'Golos Text', sans-serif", maxWidth: "100%" }}>
          {KENNEL.footerText}
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
  );
}