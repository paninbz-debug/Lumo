export const CONTACTS_PAGE = {
  hero: {
    label: "Контакты",
    title: "Москва, по предварительной записи",
    lead:
      "Не форма обратной связи — окно записи к мастеру. Менеджер ответит за 1 час в рабочее время. Если пропадаем дольше суток — компенсация 5 % стоимости. Так работаем.",
  },

  showroom: {
    address: "Москва, шоурум открывается по записи",
    addressTodo: true,
    hours: "Пн–Сб 11:00–20:00 по предварительной записи",
    metro: "Ближайшая станция метро уточняется при подтверждении",
  },

  channels: [
    { kind: "phone", label: "+7 (000) 000-00-00", todo: true },
    { kind: "telegram", label: "@lumo_studio", url: "https://t.me/lumo_studio", todo: true },
    { kind: "whatsapp", label: "WhatsApp", url: "https://wa.me/70000000000", todo: true },
    { kind: "email", label: "studio@lumo.ru", url: "mailto:studio@lumo.ru", todo: true },
  ],

  formNote:
    "Менеджер ответит за 1 час в рабочее время. Если пропадаем дольше суток — компенсация 5 % стоимости. Так работаем.",
} as const;
