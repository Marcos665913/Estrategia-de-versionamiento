"use client";

import React from "react";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  name: string;
  house: string;
  price: string;
  image: string;
  notes: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, house, price, image, notes }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, name, price, image, notes });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={image} 
          alt={name} 
          width={400} 
          height={500} 
          className={styles.image}
        />
        <div className={styles.quickAdd}>
          <button onClick={handleAdd}>Add to Bag</button>
        </div>
      </div>
      <div className={styles.info}>
        <span className={styles.house}>{house}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.notes}>{notes}</p>
        <span className={styles.price}>{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
