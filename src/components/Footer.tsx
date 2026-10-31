import Image from "next/image";
import { navLinks, site } from "@/data/site";
import { colors } from "@/lib/tokens";
import { Instagram, Mail, MapPin, Phone } from "./icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={styles.brand}>
            <a href="#top" aria-label="ProPower Electrical, back to top" className={styles.logoLink}>
              <Image
                src={site.logo.src}
                alt="ProPower Electrical"
                width={site.logo.width}
                height={site.logo.height}
                sizes="140px"
                className={styles.logo}
              />
            </a>
            <p className={styles.blurb}>
              Locally owned, family-run electrical contractors. Based in Christchurch, servicing the wider
              Canterbury region.
            </p>
          </div>

          <nav aria-label="Footer" className={styles.explore}>
            <h2 className={styles.heading}>Explore</h2>
            <ul className={styles.list}>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={styles.link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.touch}>
            <h2 className={styles.heading}>Get in touch</h2>
            <ul className={styles.list}>
              <li>
                <a href={site.phoneHref} className={`${styles.link} ${styles.bold}`}>
                  <Phone size={16} stroke={colors.bronze} />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className={styles.shrink}>
                <a href={site.emailHref} className={`${styles.link} ${styles.email}`}>
                  <Mail size={16} stroke={colors.bronze} className={styles.noShrink} />
                  <span className={styles.shrink}>
                    info@<wbr />
                    propowerelectrical.co.nz
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link} ${styles.insta}`}
                >
                  <Instagram size={16} stroke={colors.bronze} />
                  {site.instagramHandle}
                </a>
              </li>
              <li className={styles.location}>
                <MapPin size={16} stroke={colors.bronze} className={styles.pin} />
                Christchurch &amp; Canterbury
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <span>© ProPower Electrical Limited. All rights reserved.</span>
          <span>{site.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
