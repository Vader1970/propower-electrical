import Image from "next/image";
import { colors } from "@/lib/tokens";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./icons";
import styles from "./Hero.module.css";

const heroServices = ["Residential", "Commercial", "Retail", "Building Maintenance"];

export default function Hero() {
  return (
    <section aria-label="Introduction" className={styles.hero}>
      <Image
        src="/images/hero/twilight-waterfront-house.png"
        alt="Modern waterfront home at dusk, with warm exterior wall lights, glass sliding doors and timber decking above the bay"
        fill
        preload
        sizes="100vw"
        quality={85}
        className={styles.image}
      />
      <div aria-hidden="true" className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Christchurch &amp; Canterbury Electricians</p>
          <h1 className={styles.title}>Electrical work that brings spaces to life.</h1>
          <p className={styles.lead}>
            Residential, retail and commercial electrical solutions delivered with care, experience and
            attention to detail.
          </p>
          <div className={styles.ctas}>
            <a href="#contact" className={styles.primary}>
              <span>Discuss Your Project</span>
              <ArrowRight />
            </a>
            <a href="#work" className={styles.secondary}>
              <span>Explore Our Work</span>
              <ArrowDown />
            </a>
          </div>
        </div>

        <div className={styles.row}>
          {heroServices.map((name) => (
            <a key={name} href="#services" className={styles.rowLink}>
              <span>{name}</span>
              <ArrowUpRight size={15} strokeWidth={2.2} stroke={colors.orange} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
