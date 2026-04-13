import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CONTACTS } from "@/data/content";

const SEND_EMAIL_URL = "https://functions.poehali.dev/7f3df0dd-111a-4ac9-b597-cc910934897c";

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

type Status = "idle" | "loading" | "sent" | "error";

export default function ContactsSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState("");

  async function handleSend() {
    if (!name.trim() || !contact.trim()) {
      setFieldError("Заполните имя и контакт");
      return;
    }
    setFieldError("");
    setStatus("loading");
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

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
          {status === "sent" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(250,246,240,0.1)" }}>
                <Icon name="CheckCircle" size={28} style={{ color: "var(--cream)" }} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--cream)" }}>Письмо отправлено</h3>
              <p style={{ color: "rgba(250,246,240,0.7)", fontFamily: "'Golos Text', sans-serif" }}>Мы свяжемся с Вами</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(250,246,240,0.1)" }}>
                <Icon name="MailX" size={28} style={{ color: "#ff8a80" }} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--cream)" }}>Почему-то письмо не хочет уходить</h3>
              <p className="mb-2" style={{ color: "rgba(250,246,240,0.7)", fontFamily: "'Golos Text', sans-serif" }}>Выберите другой способ связи. Либо напишите напрямую со своей эл. почты на адрес:</p>
              <a href="mailto:7312007@mail.ru" className="inline-block mb-3 font-bold text-base break-all" style={{ color: "var(--cream)", fontFamily: "'Golos Text', sans-serif", textDecoration: "underline", letterSpacing: "0.02em" }}>7312007@mail.ru</a>
              <p className="mb-5" style={{ color: "rgba(250,246,240,0.7)", fontFamily: "'Golos Text', sans-serif" }}>Приносим извинения за неудобства</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "rgba(250,246,240,0.15)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
              >
                Попробовать снова
              </button>
            </div>
          )}

          {(status === "idle" || status === "loading") && (
            <>
              <h3 className="font-display text-xl font-semibold mb-5" style={{ color: "var(--cream)" }}>Написать нам</h3>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                  style={{ background: "rgba(250,246,240,0.1)", borderColor: "rgba(250,246,240,0.2)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
                />
                <input
                  type="tel"
                  placeholder="Телефон или мессенджер *"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                  style={{ background: "rgba(250,246,240,0.1)", borderColor: "rgba(250,246,240,0.2)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
                />
                <textarea
                  rows={3}
                  placeholder="Ваш вопрос или интересующая порода"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none"
                  style={{ background: "rgba(250,246,240,0.1)", borderColor: "rgba(250,246,240,0.2)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
                />
                {fieldError && (
                  <p className="text-sm" style={{ color: "#ff8a80", fontFamily: "'Golos Text', sans-serif" }}>{fieldError}</p>
                )}
                <button
                  onClick={handleSend}
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "var(--cream)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
                >
                  {status === "loading" ? "Отправляем..." : "Отправить сообщение"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}