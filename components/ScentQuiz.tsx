"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import styles from "./ScentQuiz.module.css";

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    description: string;
    value: "oud" | "ambre" | "nuit";
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which environment resonates most deeply with your soul?",
    options: [
      {
        label: "A damp forest at dusk",
        description: "Smoky woodfire, wet moss, and mysterious shadows.",
        value: "oud",
      },
      {
        label: "A sunlit historic library",
        description: "Warm leather chairs, ancient paper, and sweet vanilla tea.",
        value: "ambre",
      },
      {
        label: "A crisp morning in a citrus grove",
        description: "Fresh peppermint leaves, morning dew, and sparkling bergamot.",
        value: "nuit",
      },
    ],
  },
  {
    id: 2,
    text: "How would you describe your desired presence (intensity)?",
    options: [
      {
        label: "Opulent & Commandable",
        description: "A bold, unmistakable trail that lingers long after you leave.",
        value: "oud",
      },
      {
        label: "Comforting & Sensual",
        description: "An intimate, warm, resinous embrace meant for those close to you.",
        value: "ambre",
      },
      {
        label: "Uplifting & Luminous",
        description: "A clean, fresh, and revitalizing scent that whispers elegance.",
        value: "nuit",
      },
    ],
  },
  {
    id: 3,
    text: "Choose the atmosphere you wish to evoke:",
    options: [
      {
        label: "Mysterious & Sovereign",
        description: "Regal evenings of dark incense and rich leathers.",
        value: "oud",
      },
      {
        label: "Golden & Indulgent",
        description: "Cozy autumn afternoons filled with sweet balsams and amber.",
        value: "ambre",
      },
      {
        label: "Sparkling & Revitalizing",
        description: "A cold winter sky brightened by fresh pine and green herbs.",
        value: "nuit",
      },
    ],
  },
];

const RECOMMENDATIONS = {
  oud: {
    id: "quiz-oud-imperial",
    name: "Oud Impérial",
    price: "$295.00",
    image: "/product1.png",
    notes: "Agarwood (Oud), Cedarwood, Leather, Frankincense",
    description: "An opulent, dark, and smoky masterpiece designed for those who command presence and appreciate the deep, mysterious resins of the Orient.",
  },
  ambre: {
    id: "quiz-ambre-sacre",
    name: "Ambre Sacré",
    price: "$260.00",
    image: "/product4.png",
    notes: "Golden Amber, Madagascar Vanilla, Benzoin, Labdanum",
    description: "A warm, comforting, and deeply sensual embrace of sweet resinous amber, enveloped by rich vanilla bean and soft, velvety woody base notes.",
  },
  nuit: {
    id: "quiz-nuit-etoilee",
    name: "Nuit Étoilée",
    price: "$225.00",
    image: "/product2.png",
    notes: "Peppermint, Sweet Orange, Siberian Pine, Fir Balsam",
    description: "A luminous, fresh, and invigorating olfactory journey under a crisp, starlit winter sky. High notes of mint and citrus melt into deep forest resins.",
  },
};

const ScentQuiz: React.FC = () => {
  const { addToCart } = useCart();
  const [step, setStep] = useState<number>(0); // 0 = Intro, 1, 2, 3 = Questions, 4 = Result
  const [scores, setScores] = useState<Record<"oud" | "ambre" | "nuit", number>>({
    oud: 0,
    ambre: 0,
    nuit: 0,
  });

  const handleStart = () => {
    setScores({ oud: 0, ambre: 0, nuit: 0 });
    setStep(1);
  };

  const handleOptionSelect = (value: "oud" | "ambre" | "nuit") => {
    setScores((prev) => ({
      ...prev,
      [value]: prev[value] + 1,
    }));

    if (step < QUESTIONS.length) {
      setStep((prev) => prev + 1);
    } else {
      setStep(QUESTIONS.length + 1); // Go to results
    }
  };

  const handleReset = () => {
    setStep(0);
    setScores({ oud: 0, ambre: 0, nuit: 0 });
  };

  // Calculate recommendation
  const getRecommendation = () => {
    const { oud, ambre, nuit } = scores;
    if (ambre > oud && ambre > nuit) return RECOMMENDATIONS.ambre;
    if (nuit > oud && nuit > ambre) return RECOMMENDATIONS.nuit;
    return RECOMMENDATIONS.oud; // default/tie-breaker to oud
  };

  const recommendedFragrance = getRecommendation();

  const handleAddToBag = () => {
    addToCart({
      id: recommendedFragrance.id,
      name: recommendedFragrance.name,
      price: recommendedFragrance.price,
      image: recommendedFragrance.image,
      notes: recommendedFragrance.notes,
    });
  };

  const progressPercent = step > 0 && step <= QUESTIONS.length 
    ? ((step - 1) / QUESTIONS.length) * 100 
    : step > QUESTIONS.length ? 100 : 0;

  return (
    <section className={styles.section} id="scent-quiz">
      <div className="luxury-container">
        <h2 className={styles.title}>Scent Profile Finder</h2>
        <p className={styles.subtitle}>
          Embark on a sensory consultation to identify your signature niche fragrance.
        </p>

        <div className={styles.quizContainer}>
          {/* STEP 0: Intro */}
          {step === 0 && (
            <div className={styles.intro}>
              <div className={styles.startCard}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <p>
                  Our scents are olfactory narratives. Through three simple questions regarding your preferences and lifestyle, our alchemical calculator will match you to your signature essence.
                </p>
                <button className={styles.startBtn} onClick={handleStart}>
                  Begin consultation
                </button>
              </div>
            </div>
          )}

          {/* QUESTIONS */}
          {step > 0 && step <= QUESTIONS.length && (
            <div className={styles.questionStep}>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className={styles.progressText}>
                  Question {step} of {QUESTIONS.length}
                </div>
              </div>

              <h3 className={styles.qText}>{QUESTIONS[step - 1].text}</h3>

              <div className={styles.optionsGrid}>
                {QUESTIONS[step - 1].options.map((option, idx) => (
                  <div
                    key={idx}
                    className={styles.optionCard}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    <strong>{option.label}</strong>
                    <p>{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS */}
          {step > QUESTIONS.length && (
            <div className={styles.result}>
              <div className={styles.resultContainer}>
                <div className={styles.resultImageWrapper}>
                  <Image
                    src={recommendedFragrance.image}
                    alt={recommendedFragrance.name}
                    fill
                    className={styles.resultImage}
                    sizes="260px"
                  />
                </div>
                <div className={styles.resultInfo}>
                  <span className={styles.resultOver}>Your Signature Match</span>
                  <h3 className={styles.resultName}>{recommendedFragrance.name}</h3>
                  <p className={styles.resultDescription}>
                    {recommendedFragrance.description}
                  </p>
                  <div className={styles.resultNotes}>
                    <strong>Olfactory Notes</strong>
                    {recommendedFragrance.notes}
                  </div>
                  <span className={styles.resultPrice}>{recommendedFragrance.price}</span>
                  <div className={styles.resultActions}>
                    <button className={styles.addBtn} onClick={handleAddToBag}>
                      Add to Bag
                    </button>
                    <button className={styles.resetBtn} onClick={handleReset}>
                      Retake Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScentQuiz;
