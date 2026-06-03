"use client";
import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} luxury-container`}>
        <span className={styles.tagline}>Limited Edition</span>
        <h1 className={styles.title}>The Art of Invisible Elegance</h1>
        <p className={styles.description}>
          Discover curated fragrances from the world&apos;s most exclusive niche houses. 
          Crafted for those who leave a legacy in their wake.
        </p>
        <div className={styles.cta}>
          <button className="btn-primary">Explore Collection</button>
          <button className={styles.secondaryBtn}>Our Heritage</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
