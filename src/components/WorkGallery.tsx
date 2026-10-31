"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { GalleryItem } from "@/data/content";
import { ChevronLeft, ChevronRight, Close } from "./icons";
import styles from "./SelectedWork.module.css";

const SIZES: Record<GalleryItem["area"], string> = {
  a: "(min-width: 1000px) 66vw, 100vw",
  b: "(min-width: 1000px) 33vw, (min-width: 768px) 50vw, 100vw",
  c: "(min-width: 1000px) 33vw, (min-width: 768px) 50vw, 100vw",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function WorkGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(-1);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastOpened = useRef(-1);

  const n = items.length;
  const step = useCallback((d: number) => setOpen((i) => (i + d + n) % n), [n]);
  const close = useCallback(() => setOpen(-1), []);

  const isOpen = open > -1;

  useEffect(() => {
    if (!isOpen) return;
    const opener = triggers.current[lastOpened.current];
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [isOpen, close, step]);

  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const current = isOpen ? items[open] : null;

  return (
    <>
      <div data-reveal="" className={styles.grid}>
        {items.map((g, i) => (
          <figure key={g.src} className={styles.item} data-area={g.area}>
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => {
                lastOpened.current = i;
                setOpen(i);
              }}
              aria-label={`View larger: ${g.title}`}
              className={styles.open}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes={SIZES[g.area]}
                className={styles.photo}
                style={{ objectPosition: g.pos }}
              />
            </button>
            <figcaption className={styles.caption}>
              <span className={styles.captionText}>{g.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
          onKeyDown={trapFocus}
          className={styles.lightbox}
        >
          <div className={styles.lbTop}>
            <span className={styles.lbCount}>
              {pad(open + 1)} / {pad(n)}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className={`${styles.lbBtn} ${styles.lbClose}`}
            >
              <Close size={20} />
            </button>
          </div>
          <div className={styles.lbStage}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className={`${styles.lbBtn} ${styles.lbStep}`}
            >
              <ChevronLeft size={20} />
            </button>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              unoptimized
              loading="eager"
              onClick={(e) => e.stopPropagation()}
              className={styles.lbImage}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className={`${styles.lbBtn} ${styles.lbStep}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className={styles.lbBottom}>
            <span className={styles.lbTitle}>{current.title}</span>
          </div>
        </div>
      )}
    </>
  );
}
