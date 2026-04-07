import Icon from "@/components/ui/icon";

const CONTACTS = [
  {
    icon: "Phone",
    label: "Позвонить",
    lines: [
      { text: "+375 33 676-67-48", href: "tel:+375336766748" },
    ],
  },
  {
    icon: "Video",
    label: "TikTok",
    lines: [
      { text: "tiktok.com/@soba4ka.by", href: "https://www.tiktok.com/@soba4ka.by?_r=1&_t=ZS-95J9DUL18mD" },
    ],
  },
  {
    icon: "MessageCircle",
    label: "Написать в Viber",
    lines: [
      { text: "Группа Viber", href: "https://invite.viber.com/?g2=AQB99pRL4wNfGlTDd%2Be4OUR8hSS5UmhGe5pKbNyGftIK1ij%2BTpl%2BFZ2u159K5as8" },
    ],
  },
  {
    icon: "Send",
    label: "Telegram канал",
    lines: [
      { text: "t.me/soba4ka_eu", href: "https://t.me/soba4ka_eu" },
    ],
  },
  {
    icon: "Users",
    label: "ВКонтакте",
    lines: [
      { text: "vk.com/soba4kaby", href: "https://vk.com/soba4kaby" },
    ],
  },
  {
    icon: "Mail",
    label: "Электронная почта",
    lines: [
      { text: "Написать письмо", href: "mailto:" },
    ],
  },
];

interface Props {
  onClose: () => void;
}

export default function ContactModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-7 shadow-2xl"
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

        <h2
          className="font-display text-2xl font-semibold mb-1"
          style={{ color: "var(--brown)" }}
        >
          Как вам удобно связаться?
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}
        >
          Выберите удобный способ
        </p>

        <div className="flex flex-col gap-3">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.lines[0].href}
              target={c.lines[0].href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all hover:opacity-80"
              style={{ background: "rgba(92,51,23,0.07)", border: "1px solid rgba(92,51,23,0.1)" }}
            >
              <Icon name={c.icon} size={20} style={{ color: "var(--brown)" }} />
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--brown)", fontFamily: "'Golos Text', sans-serif" }}
                >
                  {c.label}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(92,51,23,0.6)", fontFamily: "'Golos Text', sans-serif" }}
                >
                  {c.lines[0].text}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="ml-auto opacity-40" style={{ color: "var(--brown)" }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
