export type GalleryItem = {
  area: "a" | "b" | "c";
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  pos: string;
};

export const gallery: GalleryItem[] = [
  {
    area: "a",
    src: "/images/work/bathroom-lighting.avif",
    width: 865,
    height: 653,
    alt: "Contemporary bathroom with a curved feature wall, concealed LED cove lighting, recessed downlights and a floating timber vanity",
    title: "Bathroom lighting",
    pos: "50% 50%",
  },
  {
    area: "b",
    src: "/images/work/kitchen.png",
    width: 401,
    height: 398,
    alt: "Bright traditional kitchen with pendant lights over the island and recessed downlights",
    title: "Kitchen",
    pos: "40% 45%",
  },
  {
    area: "c",
    src: "/images/work/clinical-environment.png",
    width: 400,
    height: 402,
    alt: "Bright specialist clinical room with ceiling-mounted equipment and integrated lighting",
    title: "Clinical environment",
    pos: "50% 45%",
  },
];

export const team = [
  {
    name: "Paul Hurford",
    role: "Director",
    src: "/images/team/paul-hurford.avif",
    alt: "Paul Hurford, Director of ProPower Electrical, wearing a ProPower uniform",
    body: "Works alongside the team and oversees every project, so each one is delivered seamlessly and on time.",
  },
  {
    name: "Josh Cosgrove",
    role: "Registered Electrician",
    src: "/images/team/josh-cosgrove.avif",
    alt: "Josh Cosgrove, Registered Electrician at ProPower Electrical, wearing a ProPower uniform",
    body: "A problem solver who works across all ProPower projects and specialises in service and building maintenance jobs.",
  },
] as const;

export type Review = { name: string; pre: string; hl: string; post: string };

export const reviews: Review[] = [
  {
    name: "Ruth",
    pre: "“I have used Paul and his team twice in the last few months after needing work done to a new home. Their service is second to none. I have found them to be ",
    hl: "responsive, helpful, honest and thorough",
    post: " and a lot of fun to deal with. I would not hesitate to recommend them!”",
  },
  {
    name: "Sarah",
    pre: "“Thank you ProPower team! You guys have helped us with an awesome kitchen upgrade and new LED lighting. Can’t wait to have you guys back for our bathroom renovation.”",
    hl: "",
    post: "",
  },
  {
    name: "Louisa and Hamish",
    pre: "“We have really appreciated your work and having a nice team working around us in our new home. We just went to the house in the dark for the first time since the power has been turned on and the lighting is fabulous! Thank you so much, we are very happy customers.”",
    hl: "",
    post: "",
  },
];
