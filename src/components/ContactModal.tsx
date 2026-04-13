import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_EMAIL_URL = "https://functions.poehali.dev/7f3df0dd-111a-4ac9-b597-cc910934897c";

const CONTACTS = [
  {
    icon: "Phone",
    label: "Позвонить",
    text: "+375 33 676-67-48",
    href: "tel:+375336766748",
  },
  {
    icon: "Video",
    label: "TikTok",
    text: "tiktok.com/@soba4ka.by",
    href: "https://www.tiktok.com/@soba4ka.by?_r=1&_t=ZS-95J9DUL18mD",
  },
  {
    icon: "MessageCircle",
    label: "Написать в Viber",
    text: "Группа Viber",
    href: "https://invite.viber.com/?g2=AQB99pRL4wNfGlTDd%2Be4OUR8hSS5UmhGe5pKbNyGftIK1ij%2BTpl%2BFZ2u159K5as8",
  },
  {
    icon: "Send",
    label: "Telegram канал",
    text: "t.me/soba4ka_eu",
    href: "https://t.me/soba4ka_eu",
  },
  {
    icon: "Users",
    label: "ВКонтакте",
    text: "vk.com/soba4kaby",
    href: "https://vk.com/soba4kaby",
  },
];

interface Props {
  onClose: () => void;
}

type View = "list" | "email" | "sent" | "error";

export default function ContactModal({ onClose }: Props) {
  const [view, setView] = useState<View>("list");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!name.trim() || !contact.trim()) {
      setError("Заполните имя и контакт");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });
      if (res.ok) {
        setView("sent");
      } else {
        setView("error");
      }
    } catch {
      setView("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--cream)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: "var(--brown)" }}
          onClick={onClose}
        >
          <Icon name="X" size={20} />
        </button>

        {view === "list" && (
          <>
            <h2 className="font-display text-3xl font-bold mb-1" style={{ color: "var(--brown)" }}>
              Как вам удобно связаться?
            </h2>
            <p className="text-base mb-6" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}>
              Выберите удобный способ
            </p>
            <div className="flex flex-col gap-3">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 transition-all hover:opacity-80"
                  style={{ background: "rgba(92,51,23,0.07)", border: "1px solid rgba(92,51,23,0.1)" }}
                >
                  <Icon name={c.icon} size={24} style={{ color: "var(--brown)" }} />
                  <div>
                    <div className="text-base font-bold" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>{c.label}</div>
                    <div className="text-sm font-medium" style={{ color: "rgba(92,51,23,0.65)", fontFamily: "'Golos Text', sans-serif" }}>{c.text}</div>
                  </div>
                  <Icon name="ChevronRight" size={18} className="ml-auto opacity-40" style={{ color: "var(--brown)" }} />
                </a>
              ))}

              <button
                onClick={() => setView("email")}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 transition-all hover:opacity-80 w-full text-left"
                style={{ background: "rgba(92,51,23,0.07)", border: "1px solid rgba(92,51,23,0.1)" }}
              >
                <Icon name="Mail" size={24} style={{ color: "var(--brown)" }} />
                <div>
                  <div className="text-base font-bold" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}>Электронная почта</div>
                  <div className="text-sm font-medium" style={{ color: "rgba(92,51,23,0.65)", fontFamily: "'Golos Text', sans-serif" }}>Написать письмо</div>
                </div>
                <Icon name="ChevronRight" size={18} className="ml-auto opacity-40" style={{ color: "var(--brown)" }} />
              </button>
            </div>
          </>
        )}

        {view === "email" && (
          <>
            <button
              className="flex items-center gap-2 mb-5 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
              onClick={() => setView("list")}
            >
              <Icon name="ChevronLeft" size={18} />
              <span className="text-sm font-medium">Назад</span>
            </button>
            <h2 className="font-display text-3xl font-bold mb-1" style={{ color: "var(--brown)" }}>
              Написать письмо
            </h2>
            <p className="text-base mb-6" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif", fontWeight: 500 }}>
              Ответим на 7312007@mail.ru
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                style={{ background: "rgba(92,51,23,0.06)", borderColor: "rgba(92,51,23,0.2)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
              />
              <input
                type="text"
                placeholder="Ваш телефон или e-mail *"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                style={{ background: "rgba(92,51,23,0.06)", borderColor: "rgba(92,51,23,0.2)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
              />
              <textarea
                rows={3}
                placeholder="Ваш вопрос или интересующая порода"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none"
                style={{ background: "rgba(92,51,23,0.06)", borderColor: "rgba(92,51,23,0.2)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
              />
              {error && <p className="text-sm" style={{ color: "#c0392b", fontFamily: "'Golos Text', sans-serif" }}>{error}</p>}
              <button
                onClick={handleSend}
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "var(--brown)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
              >
                {loading ? "Отправляем..." : "Отправить письмо"}
              </button>
            </div>
          </>
        )}

        {view === "sent" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(92,51,23,0.1)" }}>
              <Icon name="CheckCircle" size={32} style={{ color: "var(--brown)" }} />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--brown)" }}>Письмо отправлено</h2>
            <p className="text-base mb-6" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
              Мы свяжемся с Вами
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "var(--brown)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
            >
              Закрыть
            </button>
          </div>
        )}

        {view === "error" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(192,57,43,0.1)" }}>
              <Icon name="MailX" size={32} style={{ color: "#c0392b" }} />
            </div>
            <h2 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--brown)" }}>Почему-то письмо не хочет уходить</h2>
            <p className="text-base mb-2" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
              Выберите другой способ связи. Либо напишите напрямую со своей эл. почты на адрес:
            </p>
            <a href="mailto:7312007@mail.ru" className="inline-block mb-3 font-bold text-base break-all" style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif", textDecoration: "underline", letterSpacing: "0.02em" }}>7312007@mail.ru</a>
            <p className="text-base mb-6" style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
              Приносим извинения за неудобства
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setView("list")}
                className="w-full py-3 rounded-xl font-semibold text-sm"
                style={{ background: "var(--brown)", color: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}
              >
                Другой способ связи
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold text-sm"
                style={{ background: "rgba(92,51,23,0.1)", color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}