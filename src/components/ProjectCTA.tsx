import { site } from "@/data/site";
import { colors } from "@/lib/tokens";
import { ArrowRight, Phone } from "./icons";
import styles from "./ProjectCTA.module.css";

export default function ProjectCTA() {
  return (
    <section aria-labelledby="cta-title" className={styles.section}>
      <svg
        aria-hidden="true"
        viewBox="0 0 560 600"
        preserveAspectRatio="xMaxYMax meet"
        fill="none"
        className={styles.arcs}
      >
        <path d="M330 600 V330 A110 110 0 0 1 550 330 V470" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <path d="M270 600 V330 A170 170 0 0 1 610 330 V520" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <path d="M210 600 V330 A230 230 0 0 1 670 330 V560" stroke={colors.orange} strokeWidth="2" />
      </svg>
      <div className={styles.inner}>
        <div data-reveal="" className={styles.content}>
          <p className={styles.eyebrow}>Start your project</p>
          <h2 id="cta-title" className={styles.title}>
            Have a project in mind? <span className={styles.accent}>Let&apos;s talk.</span>
          </h2>
          <p className={styles.lead}>
            Whether you&apos;re building, renovating or planning electrical work for your business, talk to the
            ProPower team about your next project.
          </p>
          <div className={styles.ctas}>
            <a href="#contact" className={styles.primary}>
              <span>Get in Touch</span>
              <ArrowRight />
            </a>
            <a href={site.phoneHref} className={styles.secondary}>
              <span>Call {site.phoneDisplay}</span>
              <Phone />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
