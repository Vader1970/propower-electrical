import type { ProjectType } from "./site";

export type Service = {
  num: string;
  title: string;
  sub: string;
  src: string;
  alt: string;
  pos: string;
  body: string;
  tags: string[];
  cta: string;
  type: ProjectType;
};

export const services: Service[] = [
  {
    num: "01",
    title: "Residential",
    sub: "New builds & renovations",
    src: "/images/services/residential-kitchen.png",
    alt: "Contemporary kitchen with under-cabinet LED strip lighting and black pendant lights",
    pos: "55% 50%",
    body: "New homes, renovations, lighting and residential electrical work, planned around the way you live and finished with care.",
    tags: ["New homes", "Renovations", "Lighting & LED upgrades"],
    cta: "Discuss residential work",
    type: "Residential",
  },
  {
    num: "02",
    title: "Commercial",
    sub: "Business environments",
    src: "/images/services/commercial-workshop.avif",
    alt: "Commercial workshop with a high ceiling, overhead lighting and vehicle hoists",
    pos: "50% 28%",
    body: "Commercial electrical installations, servicing and solutions for business environments across Canterbury, from start-ups to large warehouses and offices.",
    tags: ["Offices", "Workshops & warehouses", "Servicing"],
    cta: "Discuss commercial work",
    type: "Commercial",
  },
  {
    num: "03",
    title: "Retail",
    sub: "Lighting & fit-outs",
    src: "/images/services/retail-majestic.png",
    alt: "Retail cafe with an illuminated sign, globe pendant lights and LED strip lighting beneath the counter",
    pos: "50% 40%",
    body: "Retail fit-outs, lighting installations and electrical solutions for retail environments. Done well, lighting becomes part of your brand and shapes how customers experience your space.",
    tags: ["Retail fit-outs", "Feature lighting", "Display lighting"],
    cta: "Discuss retail work",
    type: "Retail",
  },
  {
    num: "04",
    title: "Building Maintenance",
    sub: "Homes & commercial properties",
    src: "/images/services/building-maintenance.avif",
    alt: "ProPower Electrical vehicle parked on a building site beside scaffolding",
    pos: "62% 45%",
    body: "Ongoing electrical servicing and maintenance for homes, buildings and commercial properties, with safety always the top priority.",
    tags: ["Homes", "Commercial buildings", "Ongoing servicing"],
    cta: "Discuss maintenance",
    type: "Building Maintenance",
  },
];
