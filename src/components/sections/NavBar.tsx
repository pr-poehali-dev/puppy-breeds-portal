import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS, IMAGES } from "@/data/content";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleNav(n: typeof NAV_ITEMS[0]) {
    if (n.href) {
      navigate(n.href);
    } else {
      scrollTo(n.id);
    }
    setMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: "rgba(250,246,240,0.92)", borderColor: "rgba(92,51,23,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <img src={IMAGES.logo} alt="Из Поместья Мелешко" className="h-10 cursor-pointer" onClick={() => navigate("/")} />
        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((n) => (
            <button key={n.id} className="nav-link" onClick={() => handleNav(n)}>{n.label}</button>
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
          {NAV_ITEMS.map((n) => (
            <button key={n.id} className="nav-link text-left" onClick={() => handleNav(n)}>{n.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
