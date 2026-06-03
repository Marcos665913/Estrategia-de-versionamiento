"use client";

import React, { useState } from "react";
import styles from "./NotesVisualizer.module.css";

interface Ingredient {
  name: string;
  method: string;
  description: string;
}

interface LayerData {
  title: string;
  duration: string;
  role: string;
  ingredients: Ingredient[];
}

const PYRAMID_DATA: Record<"top" | "heart" | "base", LayerData> = {
  top: {
    title: "Top Notes (Notas de Salida)",
    duration: "First 10–15 Minutes",
    role: "The introductory narrative. Volatile, sparkling, and immediate. Designed to ignite sensory curiosity and set the initial tone.",
    ingredients: [
      {
        name: "Calabrian Bergamot",
        method: "Cold-Pressed Peel",
        description: "Harvested from selected groves in southern Italy, offering a crisp, complex citrus aroma with subtle tea-like and floral facets.",
      },
      {
        name: "English Peppermint",
        method: "Steam-Distilled Leaves",
        description: "Brings an icy, sharp, and revitalizing crispness that immediately wakes up the olfactory nerves.",
      },
      {
        name: "Sweet Orange",
        method: "Cold Expression",
        description: "Juicy, sunny, and sweet, giving a warm solar burst of optimism that balances green herbal aspects.",
      },
    ],
  },
  heart: {
    title: "Heart Notes (Notas de Corazón)",
    duration: "2 to 4 Hours",
    role: "The soul of the fragrance. Provides full-bodied character, complexity, and harmonious transition as the top notes gently dissipate.",
    ingredients: [
      {
        name: "Grandiflorum Jasmine",
        method: "Solvent Extraction",
        description: "Dawn-picked blossoms yielding an opulent, rich floral depth that is warm, creamy, and mildly indolic.",
      },
      {
        name: "Damask Rose",
        method: "Hydro-Distillation",
        description: "A velvety, classic, yet spicy-floral signature representing the highest class of perfumery craftsmanship.",
      },
      {
        name: "Siberian Pine",
        method: "Steam-Distilled Needles",
        description: "A dry, green, forest-like balsamic freshness that introduces clean outdoor woody qualities.",
      },
    ],
  },
  base: {
    title: "Base Notes (Notas de Fondo)",
    duration: "8 to 24+ Hours",
    role: "The anchor of the perfume. Fixes the lighter notes to the skin, providing deep longevity, sensuality, and persistent warmth.",
    ingredients: [
      {
        name: "Wild Agarwood (Oud)",
        method: "Fractional Steam Distillation",
        description: "Precious resinous heartwood from Aquilaria trees. Deep, dark, smoky, and complex with a leather-animalic profile.",
      },
      {
        name: "Madagascar Vanilla",
        method: "CO2 Extraction",
        description: "Exquisite cured pods offering a rich, sweet, slightly woody balsamic warmth, avoiding cloying sugariness.",
      },
      {
        name: "Mysore Sandalwood",
        method: "Steam Distilled Heartwood",
        description: "Distilled from mature heartwood, offering an ultra-smooth, creamy, milky-woody longevity.",
      },
    ],
  },
};

const NotesVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<"top" | "heart" | "base">("top");

  const currentData = PYRAMID_DATA[selectedLayer];

  return (
    <section className={styles.section} id="fragrance-notes">
      <div className="luxury-container">
        <h2 className={styles.title}>The Olfactory Architecture</h2>
        <p className={styles.subtitle}>
          Explore the temporal evolution and raw botanical ingredients behind our artisanal extractions.
        </p>

        <div className={styles.visualizerGrid}>
          {/* Left Column: Interactive Pyramid */}
          <div className={styles.pyramidWrapper}>
            <svg viewBox="0 0 320 320" className={styles.svgPyramid}>
              {/* TOP NOTES POLYGON */}
              <polygon
                points="160,15 220,105 100,105"
                className={`${styles.pyramidLayer} ${selectedLayer === "top" ? styles.pyramidLayerActive : ""}`}
                onClick={() => setSelectedLayer("top")}
                aria-label="Top Notes"
              />
              <text
                x="160"
                y="75"
                className={`${styles.layerLabel} ${selectedLayer === "top" ? styles.layerLabelActive : ""}`}
              >
                Top Notes
              </text>

              {/* HEART NOTES POLYGON */}
              <polygon
                points="100,105 220,105 270,200 50,200"
                className={`${styles.pyramidLayer} ${selectedLayer === "heart" ? styles.pyramidLayerActive : ""}`}
                onClick={() => setSelectedLayer("heart")}
                aria-label="Heart Notes"
              />
              <text
                x="160"
                y="160"
                className={`${styles.layerLabel} ${selectedLayer === "heart" ? styles.layerLabelActive : ""}`}
              >
                Heart Notes
              </text>

              {/* BASE NOTES POLYGON */}
              <polygon
                points="50,200 270,200 305,290 15,290"
                className={`${styles.pyramidLayer} ${selectedLayer === "base" ? styles.pyramidLayerActive : ""}`}
                onClick={() => setSelectedLayer("base")}
                aria-label="Base Notes"
              />
              <text
                x="160"
                y="255"
                className={`${styles.layerLabel} ${selectedLayer === "base" ? styles.layerLabelActive : ""}`}
              >
                Base Notes
              </text>
            </svg>
          </div>

          {/* Right Column: Information Display Panel */}
          <div className={styles.infoPanel}>
            <div className={styles.layerTitleWrapper}>
              <h3 className={styles.layerTitle}>{currentData.title}</h3>
              <span className={styles.layerDuration}>{currentData.duration}</span>
            </div>

            <p className={styles.layerRole}>{currentData.role}</p>

            <h4 className={styles.ingredientsTitle}>Premium Botanical Ingredients</h4>
            <div className={styles.ingredientsList}>
              {currentData.ingredients.map((ing, idx) => (
                <div key={`${selectedLayer}-${idx}`} className={styles.ingredient}>
                  <div className={styles.ingredientName}>
                    {ing.name}
                    <span className={styles.ingredientMethod}>{ing.method}</span>
                  </div>
                  <p className={styles.ingredientDesc}>{ing.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesVisualizer;
