import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        
        {/* Future Improvements Section - As requested by user */}
        <section className={styles.futureImprovements}>
          <div className="luxury-container">
            <div className={styles.improveCard}>
              <h2>Coming to Our Atelier</h2>
              <p>We are constantly evolving the digital fragrance experience. In future releases, we plan to introduce:</p>
              <ul className={styles.improveList}>
                <li>
                  <span className={styles.bullet}>01</span>
                  <strong>Scent Profile Quiz</strong>
                  <p>Discover your olfactory signature through an interactive sensory journey.</p>
                </li>
                <li>
                  <span className={styles.bullet}>02</span>
                  <strong>Fragrance Notes Visualizer</strong>
                  <p>Explore the complex architecture of our scents with a deep dive into Top, Heart, and Base notes.</p>
                </li>
                <li>
                  <span className={styles.bullet}>03</span>
                  <strong>The Alchemist Club</strong>
                  <p>Exclusive membership providing early access to rare batches and artisanal samples.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
