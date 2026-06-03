import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Obsidian Oud",
    house: "LUMINESCENCE",
    price: "$280.00",
    image: "/product1.png",
    notes: "Black Pepper, Agarwood, Ambergris"
  },
  {
    id: 2,
    name: "Ethereal Bloom",
    house: "MAISON DE SOIE",
    price: "$210.00",
    image: "/product2.png",
    notes: "White Jasmine, Bergamot, Silk Musk"
  },
  {
    id: 3,
    name: "Midnight Velvet",
    house: "NOIR ARCHIVE",
    price: "$320.00",
    image: "/product3.png",
    notes: "Damask Rose, Patchouli, Dark Chocolate"
  },
  {
    id: 4,
    name: "Ivory Smoke",
    house: "LUMINESCENCE",
    price: "$245.00",
    image: "/product4.png",
    notes: "Incense, Sandalwood, Vanilla Bean"
  }
];

const ProductGrid = () => {
  return (
    <section className={`${styles.section} luxury-container`}>
      <div className={styles.header}>
        <h2 className={styles.title}>The Curated Selection</h2>
        <p className={styles.subtitle}>Explore our most coveted niche fragrances</p>
      </div>
      <div className={styles.grid}>
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
