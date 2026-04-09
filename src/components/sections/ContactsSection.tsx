import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/data/content";

const CONTACT_CARDS = [
  {
    icon: "Phone",
    label: "Телефон",
    display: CONTACTS.phone,
    href: `tel:${CONTACTS.phone}`,
    sub: "Звонки и WhatsApp",
    color: "#4CAF50",
  },
  {
    icon: "Send",
    label: "Телеграм канал",
    display: "Перейти в канал",
    href: CONTACTS.telegram,
    sub: "@soba4ka_eu",
    color: "#29B6F6",
  },
  {
    icon: "Music",
    label: "TikTok",
    display: "Смотреть видео",
    href: CONTACTS.tiktok,
    sub: "@soba4ka.by",
    color: "#EE1D52",
  },
  {
    icon: "Users",
    label: "ВКонтакте",
    display: "Наша группа",
    href: CONTACTS.vk,
    sub: "vk.com/soba4kaby",
    color: "#2196F3",
  },
  {
    icon: "MessageSquare",
    label: "Viber",
    display: "Написать в Viber",
    href: CONTACTS.viber,
    sub: "Чат питомника",
    color: "#7B1FA2",
  },
];

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-16 sm:py-24" style={{ background: "var(--brown)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Контакты</div>
        <h2 className="font-display mb-4" style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)", color: "var(--cream)", fontWeight: 500 }}>
          Хотите купить щенка?<br /><em>Напишите нам!</em>
        </h2>
        <p className="text-sm sm:text-base mb-8 sm:mb-10 px-2" style={{ color: "rgba(250,246,240,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
          Расскажем о доступных щенках мальтипу, йорков, кавапу и пушон. Помогаем выбрать питомца и организуем доставку по всему СНГ
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {CONTACT_CARDS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rounded-2xl p-4 sm:p-5 text-center transition-all hover:scale-105 hover:opacity-90 no-underline block"
              style={{ background: "rgba(250,246,240,0.08)", border: "1px solid rgba(250,246,240,0.15)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${c.color}22` }}
              >
                <Icon name={c.icon} size={20} style={{ color: c.color }} />
              </div>
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(250,246,240,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{c.label}</div>
              <div className="font-semibold text-sm mb-1" style={{ color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>{c.display}</div>
              <div className="text-xs" style={{ color: "rgba(250,246,240,0.5)", fontFamily: "'Golos Text', sans-serif" }}>{c.sub}</div>
            </a>
          ))}
        </div>
        <div className="rounded-2xl p-5 sm:p-8 text-left max-w-xl mx-auto" style={{ background: "rgba(250,246,240,0.07)", border: "1px solid rgba(250,246,240,0.12)" }}>
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
  );
}
