export const site = {
  name: "ProPower Electrical",
  phoneDisplay: "(03) 322 9922",
  phoneHref: "tel:+6433229922",
  email: "info@propowerelectrical.co.nz",
  emailHref: "mailto:info@propowerelectrical.co.nz",
  instagramHref: "https://www.instagram.com/propowerelectrical/",
  instagramHandle: "@propowerelectrical",
  logo: { src: "/images/brand/propower-logo.png", width: 683, height: 336 },
  disclaimer:
    "Independent website redesign concept by Pegasus Digital — not the official ProPower Electrical website.",
} as const;

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const projectTypes = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Retail", label: "Retail" },
  { value: "Building Maintenance", label: "Building Maintenance" },
  { value: "Other", label: "Something else" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["value"];
