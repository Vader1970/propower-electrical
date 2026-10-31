import { gallery } from "@/data/content";
import { site } from "@/data/site";
import { colors } from "@/lib/tokens";
import { Instagram } from "./icons";
import WorkGallery from "./WorkGallery";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="" className={styles.head}>
          <div className={styles.headMain}>
            <p className={styles.eyebrow}>Selected work</p>
            <h2 id="work-title" className={styles.title}>
              The details speak for themselves.
            </h2>
          </div>
          <div className={styles.aside}>
            <p className={styles.intro}>
              A selection of finished spaces from ProPower&apos;s residential and commercial work. Select an image
              to view it larger.
            </p>
            <a href={site.instagramHref} target="_blank" rel="noopener noreferrer" className={styles.insta}>
              <Instagram size={17} stroke={colors.bronze} />
              <span className={styles.instaLabel}>View more on Instagram</span>
            </a>
          </div>
        </div>

        <WorkGallery items={gallery} />
      </div>
    </section>
  );
}
