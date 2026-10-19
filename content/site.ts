export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://port.wilsb.me",
  name: "Wilson Anggriawan",
  handle: "WilsonCc7",
  email: "angwilson127@gmail.com",
  location: "Jakarta, GMT+7",
  school: "SMK Cinta Kasih Tzu Chi",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Uses", href: "/#uses" },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/WilsonCc7" },
    { label: "Email", href: "mailto:angwilson127@gmail.com" },
  ],
} as const;
