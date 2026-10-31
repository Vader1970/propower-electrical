"use client";

import { useState } from "react";
import { reviews } from "@/data/content";
import { ArrowLeft, ArrowRight } from "./icons";
import styles from "./Testimonials.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const n = reviews.length;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <div data-reveal="" className={styles.head}>
            <p className={styles.eyebrow}>Client feedback</p>
            <h2 id="reviews-title" className={styles.title}>
              Good work. Good words.
            </h2>
          </div>

          <div
            data-reveal=""
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            className={styles.carousel}
          >
            <div aria-live="polite" className={styles.stack}>
              {reviews.map((r, i) => {
                const active = i === current;
                return (
                  <figure key={r.name} aria-hidden={!active} data-active={active} className={styles.review}>
                    <span aria-hidden="true" className={styles.mark}>
                      “
                    </span>
                    <blockquote className={styles.quote}>
                      <p className={styles.text}>
                        {r.pre}
                        {r.hl && <span className={styles.highlight}>{r.hl}</span>}
                        {r.post}
                      </p>
                    </blockquote>
                    <figcaption className={styles.name}>{r.name}</figcaption>
                  </figure>
                );
              })}
            </div>

            <div className={styles.controls}>
              <div className={styles.tabs}>
                {reviews.map((r, i) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-pressed={i === current}
                    aria-label={`Show review from ${r.name}`}
                    className={styles.tab}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
              <div className={styles.stepper}>
                <span className={styles.count}>
                  {pad(current + 1)} / {pad(n)}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c + n - 1) % n)}
                  aria-label="Previous review"
                  className={styles.prev}
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c + 1) % n)}
                  aria-label="Next review"
                  className={styles.next}
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
