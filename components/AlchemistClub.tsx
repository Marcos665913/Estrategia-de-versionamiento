"use client";

import React, { useState } from "react";
import styles from "./AlchemistClub.module.css";

interface Tier {
  id: "initiate" | "adept" | "grandmaster";
  name: string;
  price: string;
  billing: string;
  features: string[];
}

const TIERS: Tier[] = [
  {
    id: "initiate",
    name: "The Initiate",
    price: "$25",
    billing: "/ month",
    features: [
      "3 monthly fragrance vials (2ml each)",
      "Curated by our chief alchemist",
      "Complimentary boutique shipping",
    ],
  },
  {
    id: "adept",
    name: "The Adept",
    price: "$45",
    billing: "/ month",
    features: [
      "5 monthly fragrance vials (2ml each)",
      "Custom choice of raw extractions",
      "Early access to limited small batches",
      "Invitations to digital atelier salons",
    ],
  },
  {
    id: "grandmaster",
    name: "The Grand Master",
    price: "$85",
    billing: "/ month",
    features: [
      "One bespoke full bottle (50ml) quarterly",
      "Unlimited monthly sample vial requests",
      "Direct line to our lead compounder",
      "VIP access to offline global boutiques",
    ],
  },
];

interface FormState {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const AlchemistClub: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<"initiate" | "adept" | "grandmaster">("adept");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeTierObj = TIERS.find((t) => t.id === selectedTier)!;

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setForm((prev) => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  // Format Expiry Date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setForm((prev) => ({ ...prev, expiry: formatted }));
    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  // Format CVV (3 digits)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, cvv: value }));
    if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: "" }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const rawCard = form.cardNumber.replace(/\s/g, "");
    if (rawCard.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    const expiryParts = form.expiry.split("/");
    if (form.expiry.length !== 5 || expiryParts.length !== 2) {
      newErrors.expiry = "Expiry must be MM/YY.";
    } else {
      const month = parseInt(expiryParts[0]);
      if (month < 1 || month > 12) {
        newErrors.expiry = "Invalid month.";
      }
    }

    if (form.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Mock payment gateway delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleResetForm = () => {
    setForm({
      name: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    setIsSuccess(false);
  };

  return (
    <section className={styles.section} id="alchemist-club">
      <div className="luxury-container">
        <h2 className={styles.title}>The Alchemist Club</h2>
        <p className={styles.subtitle}>
          Secure a recurring membership to receive rare formulas, seasonal samples, and bespoke creations.
        </p>

        <div className={styles.clubContainer}>
          {/* Tier Selector */}
          <div className={styles.tierGrid}>
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`${styles.tierCard} ${selectedTier === tier.id ? styles.tierCardActive : ""}`}
                onClick={() => !isSuccess && setSelectedTier(tier.id)}
              >
                <h3 className={styles.tierName}>{tier.name}</h3>
                <div className={styles.tierPrice}>
                  {tier.price}
                  <span>{tier.billing}</span>
                </div>
                <div className={styles.tierFeatures}>
                  {tier.features.map((feat, idx) => (
                    <div key={idx}>— {feat}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Registration Form Wrapper */}
          <div className={styles.formWrapper}>
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Initiate Membership</h3>
                <p className={styles.formSubtitle}>
                  Tier: <strong>{activeTierObj.name}</strong> ({activeTierObj.price}/mo)
                </p>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="membership-name">Full Name</label>
                  <input
                    type="text"
                    id="membership-name"
                    name="name"
                    value={form.name}
                    onChange={handleTextChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                    placeholder="E.g., Alexander Mercer"
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="membership-email">Email Address</label>
                  <input
                    type="email"
                    id="membership-email"
                    name="email"
                    value={form.email}
                    onChange={handleTextChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    placeholder="E.g., alexander@atelier.com"
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="membership-card">Card Number</label>
                  <input
                    type="text"
                    id="membership-card"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleCardNumberChange}
                    className={`${styles.input} ${errors.cardNumber ? styles.inputError : ""}`}
                    placeholder="4111 2222 3333 4444"
                  />
                  {errors.cardNumber && <span className={styles.errorText}>{errors.cardNumber}</span>}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="membership-expiry">Expiration</label>
                    <input
                      type="text"
                      id="membership-expiry"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleExpiryChange}
                      className={`${styles.input} ${errors.expiry ? styles.inputError : ""}`}
                      placeholder="MM/YY"
                    />
                    {errors.expiry && <span className={styles.errorText}>{errors.expiry}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="membership-cvv">CVV</label>
                    <input
                      type="text"
                      id="membership-cvv"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleCvvChange}
                      className={`${styles.input} ${errors.cvv ? styles.inputError : ""}`}
                      placeholder="123"
                    />
                    {errors.cvv && <span className={styles.errorText}>{errors.cvv}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      Encrypting Credentials...
                    </>
                  ) : (
                    "Authorize Tier Membership"
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Welcome to the Atelier</h3>
                <p className={styles.successMessage}>
                  Your membership in <strong>{activeTierObj.name}</strong> is now active. A welcome package containing your first formulas and access keys has been sent to: <span className={styles.newMemberName}>{form.email}</span>.
                </p>
                <button className={styles.submitBtn} style={{ width: "auto", padding: "0.8rem 2rem" }} onClick={handleResetForm}>
                  Close / Register Another Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlchemistClub;
