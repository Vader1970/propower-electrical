import { site } from "@/data/site";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div data-reveal="" className={styles.info}>
            <p className={styles.eyebrow}>Contact</p>
            <h2 id="contact-title" className={styles.title}>
              Tell us about your project.
            </h2>
            <p className={styles.intro}>
              Share a few details, or call to arrange a consultation. We&apos;ll talk through what you need and the
              best way to get it done.
            </p>
            <dl className={styles.details}>
              <div className={styles.detail}>
                <dt>Phone</dt>
                <dd>
                  <a href={site.phoneHref} className={styles.phone}>
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className={styles.detail}>
                <dt>Email</dt>
                <dd className={styles.emailDd}>
                  <a href={site.emailHref} className={styles.email}>
                    info@<wbr />
                    propowerelectrical.co.nz
                  </a>
                </dd>
              </div>
              <div className={styles.detail}>
                <dt>Service area</dt>
                <dd className={styles.area}>Based in Christchurch, servicing the wider Canterbury region</dd>
              </div>
            </dl>
          </div>

          <div data-reveal="" className={styles.formCol}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>Project enquiry</h3>
                <span className={styles.badge}>
                  <span className={styles.badgeDot} />
                  Prototype form · Not connected
                </span>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
