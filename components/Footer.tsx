import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} luxury-container`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3>LUMINESCENCE</h3>
            <p>Elevating the art of perfumery since 1992. Our scents are crafted in small batches using rare, ethically sourced ingredients.</p>
          </div>
          <div className={styles.links}>
            <div className={styles.group}>
              <h4>Client Services</h4>
              <ul>
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>Gifting</li>
              </ul>
            </div>
            <div className={styles.group}>
              <h4>Explore</h4>
              <ul>
                <li>The Archive</li>
                <li>Scent Education</li>
                <li>Store Locator</li>
              </ul>
            </div>
          </div>
          <div className={styles.newsletter}>
            <h4>Newsletter</h4>
            <p>Join our inner circle for exclusive access to new releases.</p>
            <form className={styles.form}>
              <input type="email" placeholder="Your Email Address" />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2026 LUMINESCENCE NICHE PARFUMERIE. ALL RIGHTS RESERVED.</p>
          <div className={styles.social}>
            <span>Instagram</span>
            <span>Pinterest</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
