"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type KeyboardEvent } from "react";
import { services, type Service } from "@/data/services";
import { useEnquiry } from "./EnquiryProvider";
import { ArrowRight, Plus } from "./icons";
import styles from "./ServicesAccordion.module.css";

const IMAGE_SIZES = "(min-width: 1024px) 50vw, 100vw";
const HOVER_INTENT_MS = 130;
// useLayoutEffect on the client so images mount before paint; useEffect on the server, where it never runs.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Mounts a fill image only while its frame has a real height, so the hidden desktop/mobile layout never warns. */
function FillImage({
  frameClassName,
  alt,
  ...image
}: { frameClassName: string; alt: string } & Omit<ComponentProps<typeof Image>, "fill" | "alt">) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setShown(frame.getBoundingClientRect().height > 0);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={frameClassName}>
      {shown ? <Image {...image} alt={alt} fill /> : null}
    </div>
  );
}

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
                  <FillImage
                    frameClassName={styles.previewImg}
                    src={s.src}
                    alt=""
                    sizes={IMAGE_SIZES}
                    className={styles.cover}
                    style={{ objectPosition: s.pos }}
                  />
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
                  <FillImage
                    frameClassName={styles.media}
                    src={s.src}
                    alt={s.alt}
                    sizes={IMAGE_SIZES}
                    className={styles.cover}
                    style={{ objectPosition: s.pos }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & mobile: every service shown in full, no toggles */}
        <div className={styles.stack}>
          {services.map((s) => (
            <article key={s.title} className={styles.mItem}>
              <div className={styles.mHead}>
                <div aria-hidden="true" className={styles.mHeadBg}>
                  <FillImage
                    frameClassName={styles.mHeadBgImg}
                    src={s.src}
                    alt=""
                    sizes={IMAGE_SIZES}
                    className={styles.cover}
                    style={{ objectPosition: s.pos }}
                  />
                </div>
                <span aria-hidden="true" className={styles.mHeadShade} />
                <span aria-hidden="true" className={styles.mLine} />
                <span className={`${styles.num} ${styles.mNum}`}>{s.num}</span>
                <h3 className={styles.mTitle}>{s.title}</h3>
              </div>
              <div className={styles.mBody}>
                <FillImage
                  frameClassName={styles.mMedia}
                  src={s.src}
                  alt={s.alt}
                  sizes={IMAGE_SIZES}
                  className={styles.cover}
                  style={{ objectPosition: s.pos }}
                />
                <p className={`${styles.sub} ${styles.mSub}`}>{s.sub}</p>
                <p className={styles.mBodyText}>{s.body}</p>
                <Tags tags={s.tags} className={styles.mTags} />
                <Cta service={s} className={styles.mCta} onPick={() => selectType(s.type)} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
