import Image from "next/image";
import { colors } from "@/lib/tokens";
import { ArrowRight, PathPair } from "./icons";
import styles from "./Approach.module.css";

const trust = [
  {
    title: "Homes & businesses",
    body: "Residential, retail, commercial and maintenance work.",
    d1: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
    d2: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  },
  {
    title: "Clear communication",
    body: "Kept informed from the first visit to the finished job.",
    d1: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    d2: "M12 12",
  },
  {
    title: "Canterbury-wide",
    body: "Based in Christchurch, servicing the wider region.",
    d1: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",
    d2: "M12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6",
  },
];

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div data-reveal="" className={styles.text}>
            <div>
              <h2 id="approach-title" className={styles.title}>
                Quality is in the details.
              </h2>
              <p className={styles.lead}>
                Since ProPower began, quality has been the focus. Meticulous electricians and the best materials
                in the industry, combined with clear communication, deliver electrical work that is solid and
                built to last.
              </p>
            </div>
            <a href="#services" className={styles.cta}>
              <span>Explore our services</span>
              <span className={styles.ctaIcon}>
                <ArrowRight size={15} strokeWidth={2.2} />
              </span>
            </a>
          </div>

          <figure data-reveal="" className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src="/images/approach/architectural-wall-light.avif"
                alt="Contemporary exterior wall light casting a warm wash of light down timber cladding"
                fill
                sizes="(min-width: 960px) 60vw, 100vw"
                className={styles.image}
              />
            </div>
          </figure>
        </div>

        <ul data-reveal="" className={styles.band}>
          {trust.map((t) => (
            <li key={t.title} className={styles.item}>
              <span aria-hidden="true" className={styles.itemIcon}>
                <PathPair d1={t.d1} d2={t.d2} size={20} strokeWidth={1.9} stroke={colors.orange} />
              </span>
              <div className={styles.itemText}>
                <p className={styles.itemTitle}>{t.title}</p>
                <p className={styles.itemBody}>{t.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
