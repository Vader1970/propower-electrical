"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { navLinks, site } from "@/data/site";
import { colors } from "@/lib/tokens";
import { ArrowRight, ArrowUpRight, Close, Menu, Phone } from "./icons";
import styles from "./Navbar.module.css";

const DESKTOP_QUERY = "(min-width: 1120px)";

export function DisclaimerStrip() {
  return (
    <div className={styles.strip}>
      <div className={styles.stripInner}>
        <span className={styles.stripDot} />
        <span>{site.disclaimer}</span>
      </div>
    </div>
  );
}

/** Reserves the fixed header's height in the flow, including the strip as it wraps. */
export function HeaderSpacer() {
  return (
    <div aria-hidden="true" className={styles.spacer}>
      <DisclaimerStrip />
      <div className={styles.spacerBar} />
    </div>
  );
}

function useHideOnScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    let isHidden = false;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const threshold = Math.max(240, window.innerHeight * 0.55);
      const dy = y - lastY;
      if (y <= threshold) {
        isHidden = false;
        lastY = y;
      } else if (dy > 10) {
        isHidden = true;
        lastY = y;
      } else if (dy < -6) {
        isHidden = false;
        lastY = y;
      }
      setHidden(isHidden);
      setScrolled(y > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, hidden, reveal: () => setHidden(false) };
}

export default function Navbar() {
  const { scrolled, hidden, reveal } = useHideOnScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const onFocus = (e: FocusEvent<HTMLElement>) => {
    let keyboard = false;
    try {
      keyboard = e.target.matches(":focus-visible");
    } catch {}
    if (keyboard && !focusIn) {
      setFocusIn(true);
      reveal();
    }
  };

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null) && focusIn) setFocusIn(false);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    reveal();
  };

  return (
    <header
      className={styles.header}
      data-hidden={hidden && !menuOpen && !focusIn}
      data-scrolled={scrolled}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <DisclaimerStrip />
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <a href="#top" aria-label="ProPower Electrical home" className={styles.logoLink}>
            <Image
              src={site.logo.src}
              alt="ProPower Electrical"
              width={site.logo.width}
              height={site.logo.height}
              sizes="120px"
              loading="eager"
              className={styles.logo}
            />
          </a>

          <nav aria-label="Primary" className={styles.nav}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={styles.navLink}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className={styles.actions}>
            <a href={site.phoneHref} className={styles.phone}>
              <Phone stroke={colors.orange} />
              {site.phoneDisplay}
            </a>
            <a href="#contact" className={styles.quote}>
              <span>Get a Quote</span>
              <ArrowRight />
            </a>
          </div>

          <div className={styles.compact}>
            <a href={site.phoneHref} aria-label={`Call ${site.phoneDisplay}`} className={styles.callIcon}>
              <Phone size={20} strokeWidth={1.9} />
            </a>
            <button
              ref={burgerRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={styles.burger}
            >
              {menuOpen ? <Close size={20} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className={styles.menu}>
          <nav aria-label="Mobile" className={styles.menuNav}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={closeMenu} className={styles.menuLink}>
                <span>{l.label}</span>
                <ArrowRight size={20} stroke={colors.bronze} />
              </a>
            ))}
            <div className={styles.menuCtas}>
              <a href="#contact" onClick={closeMenu} className={styles.menuQuote}>
                <span>Get a Quote</span>
                <ArrowRight />
              </a>
              <a href={site.phoneHref} className={styles.menuCall}>
                <span>Call {site.phoneDisplay}</span>
                <ArrowUpRight />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
