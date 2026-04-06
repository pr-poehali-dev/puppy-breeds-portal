import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/data/content";

const CONTACT_CARDS = [
  { icon: "Phone",         label: "Телефон",  value: CONTACTS.phone,     sub: "Звонки и WhatsApp" },
  { icon: "MessageCircle", label: "Telegram", value: CONTACTS.telegram,   sub: "Напишите нам" },
  { icon: "Instagram",     label: "Instagram",value: CONTACTS.instagram,  sub: "Фото и видео щенков" },
];

export default function ContactsSection() {
  return (
    <section id="contacts" className="py-24" style={{ background: "var(--brown)" }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--pink)", fontFamily: "'Golos Text', sans-serif" }}>Контакты</div>
        <h2 className="font-display mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--cream)", fontWeight: 500 }}>
          Хотите купить щенка?<br /><em>Напишите нам!</em>
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(250,246,240,0.7)", fontFamily: "'Golos Text', sans-serif" }}>
          Расскажем о доступных щенках мальтипу, йорков, кавапу и пушон. Помогаем выбрать питомца и организуем доставку по всему СНГ
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {CONTACT_CARDS.map((c) => (
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
  );
}