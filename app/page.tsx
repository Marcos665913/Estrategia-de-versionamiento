import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ScentQuiz from "@/components/ScentQuiz";
import NotesVisualizer from "@/components/NotesVisualizer";
import AlchemistClub from "@/components/AlchemistClub";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main style={{ paddingTop: "80px" }}> {/* Offset for fixed Navbar */}
        <Hero />
        <ProductGrid />
        
        {/* Scent Finder Consultation */}
        <ScentQuiz />

        {/* Olfactory Note Architecture Pyramid */}
        <NotesVisualizer />

        {/* The Alchemist Club Subscription */}
        <AlchemistClub />
      </main>
      <Footer />
    </div>
  );
}
