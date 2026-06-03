"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} luxury-container`}>
        <div className={styles.logo}>
          <Link href="/">LUMINESCENCE</Link>
          <span>NICHE PARFUMERIE</span>
        </div>
        <ul className={styles.links}>
          <li><Link href="/">Collections</Link></li>
          <li><Link href="/">The Essence</Link></li>
          <li><Link href="/">Boutiques</Link></li>
        </ul>
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">Search</button>
          <button className={styles.iconBtn} onClick={toggleCart} aria-label="Open cart">
            Bag ({cartCount})
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
