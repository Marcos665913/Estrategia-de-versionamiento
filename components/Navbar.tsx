import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} luxury-container`}>
        <div className={styles.logo}>
          <Link href="/">LUMINESCENCE</Link>
          <span>NICHE PARFUMERIE</span>
        </div>
        <ul className={styles.links}>
          <li><Link href="/collections">Collections</Link></li>
          <li><Link href="/essence">The Essence</Link></li>
          <li><Link href="/boutiques">Boutiques</Link></li>
        </ul>
        <div className={styles.actions}>
          <button className={styles.iconBtn}>Search</button>
          <button className={styles.iconBtn}>Bag (0)</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
