"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";

const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    updateQuantity,
    removeFromCart,
    toggleCart,
    subtotal,
    tax,
    total,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        clearCart();
        toggleCart();
      }, 3000);
    }, 2000);
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ""}`}
        onClick={toggleCart}
      />

      {/* Drawer Panel */}
      <div className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h2>Your Atelier Bag</h2>
          <button className={styles.closeBtn} onClick={toggleCart} aria-label="Close cart">
            &times;
          </button>
        </div>

        <div className={styles.itemsList}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <p>Your bag is currently empty.</p>
              <button className={styles.shopBtn} onClick={toggleCart}>
                Continue Exploring
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className={styles.itemImage}
                    sizes="80px"
                  />
                </div>
                <div className={styles.itemInfo}>
                  <div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    {item.notes && <p className={styles.itemNotes}>{item.notes}</p>}
                  </div>
                  <div className={styles.itemControls}>
                    <div className={styles.quantitySelector}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.itemPrice}>
                      ${(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div style={{ marginTop: "0.5rem", textAlign: "right" }}>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Luxury Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Shipping</span>
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Complimentary</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {checkoutSuccess ? (
              <div className={styles.checkoutSuccess}>
                ✓ Your order has been placed. Preparing your luxury package.
              </div>
            ) : (
              <button
                className={styles.checkoutBtn}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Securing Transaction..." : "Proceed to Checkout"}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
