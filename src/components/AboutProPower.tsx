import Image from "next/image";
import { team } from "@/data/content";
import { ArrowRight } from "./icons";
import styles from "./AboutProPower.module.css";

export default function AboutProPower() {
  return (
    <section id="about" aria-labelledby="about-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div data-reveal="" className={styles.text}>
            <p className={styles.eyebrow}>About ProPower</p>
            <h2 id="about-title" className={styles.title}>
              Good work starts with good people.
            </h2>
            <p className={styles.lead}>
              ProPower is a locally owned, family-run Christchurch electrical business, built on experience,
              practical problem-solving and genuine care for the people it works with.
            </p>
            <p className={styles.body}>
              Director Paul Hurford started ProPower after more than 20 years in the electrical industry, and
              still works alongside the team on every project.
            </p>
            <a href="#contact" className={styles.cta}>
              <span>Talk to the team</span>
              <ArrowRight />
            </a>
          </div>

          <div data-reveal="" className={styles.people}>
            <div className={styles.peopleGrid}>
              {team.map((p) => (
                <figure key={p.name} className={styles.person}>
                  <div className={styles.photo}>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 560px) 280px, 400px"
                      className={styles.photoImg}
                    />
                  </div>
                  <figcaption className={styles.caption}>
                    <p className={styles.name}>{p.name}</p>
                    <p className={styles.role}>{p.role}</p>
                    <p className={styles.bio}>{p.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
