"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { services, type Service } from "@/data/services";
import { useEnquiry } from "./EnquiryProvider";
import { ArrowRight, ChevronDown, Plus } from "./icons";
import styles from "./ServicesAccordion.module.css";

const IMAGE_SIZES = "(min-width: 1024px) 50vw, 100vw";
const HOVER_INTENT_MS = 130;

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={`${styles.tags} ${className ?? ""}`}>
      {tags.map((t) => (
        <li key={t}>
          <span className={styles.tagDot} />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Cta({ service, className, onPick }: { service: Service; className?: string; onPick: () => void }) {
  return (
    <a href="#contact" onClick={onPick} className={`${styles.cta} ${className ?? ""}`}>
      <span>{service.cta}</span>
      <span className={styles.ctaIcon}>
        <ArrowRight size={15} strokeWidth={2.2} />
      </span>
    </a>
  );
}

export default function ServicesAccordion() {
  const { selectType } = useEnquiry();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(0);
  const canHover = useRef(false);
  const hoverTimer = useRef<number | undefined>(undefined);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      canHover.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const select = (i: number) => {
    window.clearTimeout(hoverTimer.current);
    setActive(i);
  };

  const onEnter = (i: number) => {
    if (!canHover.current) return;
    window.clearTimeout(hoverTimer.current);
    setHovered(i);
    if (active !== i) hoverTimer.current = window.setTimeout(() => setActive(i), HOVER_INTENT_MS);
  };

  const onLeave = () => {
    window.clearTimeout(hoverTimer.current);
    setHovered(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = services.length;
    let next: number;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active + n - 1) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="" className={styles.head}>
          <div className={styles.headMain}>
            <p className={styles.eyebrow}>What we do</p>
            <h2 id="services-title" className={styles.title}>
              Electrical expertise for every environment.
            </h2>
          </div>
          <p className={styles.intro}>
            Four areas of expertise and one standard of workmanship. Whatever the size of the job, ProPower
            brings the same care and attention to detail.
          </p>
        </div>

        {/* Desktop: horizontal expanding panels */}
        <div className={styles.accordion} onKeyDown={onKeyDown} onMouseLeave={onLeave}>
          {services.map((s, i) => {
            const isActive = i === active;
            const state = isActive ? "active" : hovered === i ? "hover" : "idle";
            const tabId = `sv-tab-${i}`;
            const panelId = `sv-panel-${i}`;
            return (
              <div key={s.title} className={styles.panel} data-state={state} onMouseEnter={() => onEnter(i)}>
                <div aria-hidden="true" className={styles.preview}>
                  <div className={styles.previewImg}>
                    <Image
                      src={s.src}
                      alt=""
                      fill
                      sizes={IMAGE_SIZES}
                      className={styles.cover}
                      style={{ objectPosition: s.pos }}
                    />
                  </div>
                </div>
                <div aria-hidden="true" className={styles.shade} />
                <span aria-hidden="true" className={styles.line} />

                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  id={tabId}
                  onClick={() => select(i)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  aria-label={`${s.num} ${s.title}`}
                  className={styles.rail}
                >
                  <span className={`${styles.num} ${styles.railFade}`}>{s.num}</span>
                  <span className={`${styles.railGroup} ${styles.railFade}`}>
                    <span className={styles.railTitle}>{s.title}</span>
                    <span aria-hidden="true" className={styles.railInd}>
                      <Plus size={14} strokeWidth={2.2} />
                    </span>
                  </span>
                </button>

                <div id={panelId} role="region" aria-labelledby={tabId} className={styles.content}>
                  <div className={styles.copy}>
                    <div className={`${styles.meta} ${styles.fade} ${styles.d1}`}>
                      <span className={styles.num}>{s.num}</span>
                      <span className={styles.sub}>{s.sub}</span>
                    </div>
                    <h3 className={`${styles.contentTitle} ${styles.fade} ${styles.d1}`}>{s.title}</h3>
                    <p className={`${styles.body} ${styles.fade} ${styles.d2}`}>{s.body}</p>
                    <Tags tags={s.tags} className={`${styles.fade} ${styles.d3}`} />
                    <div className={`${styles.ctaWrap} ${styles.fade} ${styles.d4}`}>
                      <Cta service={s} onPick={() => selectType(s.type)} />
                    </div>
                  </div>
                  <div className={styles.media}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes={IMAGE_SIZES}
                      className={styles.cover}
                      style={{ objectPosition: s.pos }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & mobile: vertical accordion */}
        <div className={styles.stack}>
          {services.map((s, i) => {
            const open = i === mobileOpen;
            const tabId = `svm-tab-${i}`;
            const panelId = `svm-panel-${i}`;
            return (
              <div key={s.title} className={styles.mItem} data-open={open}>
                <span aria-hidden="true" className={styles.mLine} />
                <button
                  type="button"
                  id={tabId}
                  onClick={() => setMobileOpen((o) => (o === i ? -1 : i))}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={styles.mTab}
                >
                  <span aria-hidden="true" className={styles.mTabBg}>
                    <span className={styles.mTabBgImg}>
                      <Image
                        src={s.src}
                        alt=""
                        fill
                        sizes={IMAGE_SIZES}
                        className={styles.cover}
                        style={{ objectPosition: s.pos }}
                      />
                    </span>
                  </span>
                  <span aria-hidden="true" className={styles.mTabShade} />
                  <span className={`${styles.num} ${styles.mNum}`}>{s.num}</span>
                  <span className={styles.mTitle}>{s.title}</span>
                  <span aria-hidden="true" className={styles.mInd}>
                    <ChevronDown size={14} strokeWidth={2.4} className={styles.mChevron} />
                  </span>
                </button>
                <div id={panelId} role="region" aria-labelledby={tabId} className={styles.mRegion}>
                  <div className={styles.mClip}>
                    <div className={styles.mBody}>
                      <div className={styles.mMedia}>
                        <Image
                          src={s.src}
                          alt={s.alt}
                          fill
                          sizes={IMAGE_SIZES}
                          className={styles.cover}
                          style={{ objectPosition: s.pos }}
                        />
                      </div>
                      <div className={styles.mText}>
                        <p className={`${styles.sub} ${styles.mSub}`}>{s.sub}</p>
                        <p className={styles.mBodyText}>{s.body}</p>
                        <Tags tags={s.tags} className={styles.mTags} />
                        <Cta service={s} className={styles.mCta} onPick={() => selectType(s.type)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
