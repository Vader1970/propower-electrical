import type { Metadata } from "next";
import AboutProPower from "@/components/AboutProPower";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import { EnquiryProvider } from "@/components/EnquiryProvider";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar, { HeaderSpacer } from "@/components/Navbar";
import ProjectCTA from "@/components/ProjectCTA";
import RevealOnScroll from "@/components/RevealOnScroll";
import SelectedWork from "@/components/SelectedWork";
import ServicesAccordion from "@/components/ServicesAccordion";
import Testimonials from "@/components/Testimonials";
import styles from "./page.module.css";

// Speculative concept preview: keep it out of search indexes.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function Home() {
  return (
    <EnquiryProvider>
      <Navbar />
      <main>
        <div className={styles.intro}>
          <HeaderSpacer />
          <Hero />
        </div>
        <Approach />
        <ServicesAccordion />
        <SelectedWork />
        <AboutProPower />
        <Testimonials />
        <ProjectCTA />
        <Contact />
      </main>
      <Footer />
      <RevealOnScroll />
    </EnquiryProvider>
  );
}
