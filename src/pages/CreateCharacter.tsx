import { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../types/character";
import { saveCharacter } from "../services/storage";

// Step components
import { StepClass } from "../components/character-wizard/StepClass";
import { MiniStepBackground } from "../components/character-wizard/step-origin/MiniStepBackground";
import { MiniStepEquipment } from "../components/character-wizard/step-origin/MiniStepEquipment";
import { MiniStepSpecies } from "../components/character-wizard/step-origin/MiniStepSpecies";
import { MiniStepBackstory } from "../components/character-wizard/step-origin/MiniStepBackstory";
import { MiniStepLanguages } from "../components/character-wizard/step-origin/MiniStepLanguages";
import { StepStats } from "../components/character-wizard/StepStats";
import { StepAlignment } from "../components/character-wizard/StepAlignment";
import { StepDetails } from "../components/character-wizard/StepDetails";

const STEPS = [
  "1. Class",
  "2. Stats Method",
  "3. Class Traits",
  "4. Background",
  "5. Background Gear",
  "6. Species",
  "7. Species Traits",
  "8. Alignment",
  "9. Backstory",
  "10. Languages",
  "11. Details",
];

export function CreateCharacter() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    class: "Fighter",
    statsMethod: "Standard Array" as
      | "Standard Array"
      | "Random Generation"
      | "Point Cost",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    classTraits: [] as string[],
    background: "Folk Hero",
    equipment: [] as string[],
    species: "Human",
    speciesTraits: [] as string[],
    alignment: "True Neutral",
    backstory: "",
    languages: ["Common"] as string[],
    name: "",
    level: 1,
  });

  // Step-by-step validation
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.class.trim().length > 0;
      case 2:
        return Object.values(formData.stats).every((v) => v >= 1 && v <= 30);
      case 3:
        return true; // Optional class trait selections
      case 4:
        return formData.background.trim().length > 0;
      case 5:
        return formData.equipment.length > 0;
      case 6:
        return formData.species.trim().length > 0;
      case 7:
        return true; // Species options step
      case 8:
        return formData.alignment.trim().length > 0;
      case 9:
        return formData.backstory.trim().length >= 5;
      case 10:
        return formData.languages.length > 0;
      case 11:
        return formData.name.trim().length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(STEPS.length)) return;

    try {
      setIsSubmitting(true);
      const newCharacter: Character = {
        id: Date.now().toString(),
        class: formData.class,
        race: formData.species,
        background: formData.background,
        stats: formData.stats,
        alignment: formData.alignment,
        name: formData.name,
        level: formData.level,
        equipment: formData.equipment,
        backstory: formData.backstory,
        languages: formData.languages,
      } as unknown as Character;

      await saveCharacter(newCharacter);
      navigate(`/character/${newCharacter.id}`);
    } catch (err) {
      console.error("Failed to create character:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          ← Cancel
        </button>
        <h1 style={{ margin: 0 }}>New Character</h1>
      </header>

      {/* Single Linear Progress Indicator */}
      <div style={styles.stepBar}>
        {STEPS.map((title, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isPassed = stepNum < currentStep;

          let badgeStyle = styles.badgeUpcoming;
          if (isActive) badgeStyle = styles.badgeActive;
          else if (isPassed) badgeStyle = styles.badgeCompleted;

          return (
            <span key={title} style={badgeStyle}>
              {title}
            </span>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        {/* Step 1: Choose Class */}
        {currentStep === 1 && (
          <StepClass
            selectedClass={formData.class}
            onSelectClass={(cls) => setFormData((p) => ({ ...p, class: cls }))}
          />
        )}

        {/* Step 2: Ability Score Generation Method */}
        {currentStep === 2 && (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>Step 2: Ability Scores</h2>
            <div style={styles.methodSelector}>
              {(
                ["Standard Array", "Random Generation", "Point Cost"] as const
              ).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() =>
                    setFormData((p) => ({ ...p, statsMethod: method }))
                  }
                  style={
                    formData.statsMethod === method
                      ? styles.methodBtnActive
                      : styles.methodBtn
                  }
                >
                  {method}
                </button>
              ))}
            </div>
            <StepStats
              stats={formData.stats}
              onStatChange={(stat, value) =>
                setFormData((p) => ({
                  ...p,
                  stats: { ...p.stats, [stat]: value },
                }))
              }
            />
          </div>
        )}

        {/* Step 3: Core Class Traits */}
        {currentStep === 3 && (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>
              Step 3: Core Class Traits ({formData.class})
            </h2>
            <p style={styles.stepSubtitle}>
              Select your initial subclass/trait features for {formData.class}.
            </p>
            <div style={styles.traitBox}>
              <p>Primary Class Traits for {formData.class} are applied.</p>
            </div>
          </div>
        )}

        {/* Step 4: Background */}
        {currentStep === 4 && (
          <MiniStepBackground
            selectedBackground={formData.background}
            onSelect={(bg) => setFormData((p) => ({ ...p, background: bg }))}
          />
        )}

        {/* Step 5: Background Gear & Choices */}
        {currentStep === 5 && (
          <MiniStepEquipment
            selectedEquipment={formData.equipment}
            onChange={(equip) =>
              setFormData((p) => ({ ...p, equipment: equip }))
            }
          />
        )}

        {/* Step 6: Species */}
        {currentStep === 6 && (
          <MiniStepSpecies
            selectedSpecies={formData.species}
            onSelect={(sp) => setFormData((p) => ({ ...p, species: sp }))}
          />
        )}

        {/* Step 7: Species Traits & Options */}
        {currentStep === 7 && (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>
              Step 7: Species Traits ({formData.species})
            </h2>
            <p style={styles.stepSubtitle}>
              Review and configure special features for {formData.species}.
            </p>
            <div style={styles.traitBox}>
              <p>
                Innate traits and resistances for {formData.species} active.
              </p>
            </div>
          </div>
        )}

        {/* Step 8: Alignment */}
        {currentStep === 8 && (
          <StepAlignment
            selectedAlignment={formData.alignment}
            onSelectAlignment={(alignment) =>
              setFormData((p) => ({ ...p, alignment }))
            }
          />
        )}

        {/* Step 9: Backstory */}
        {currentStep === 9 && (
          <MiniStepBackstory
            backstory={formData.backstory}
            onChange={(story) =>
              setFormData((p) => ({ ...p, backstory: story }))
            }
          />
        )}

        {/* Step 10: Languages */}
        {currentStep === 10 && (
          <MiniStepLanguages
            selectedLanguages={formData.languages}
            onChange={(langs) =>
              setFormData((p) => ({ ...p, languages: langs }))
            }
          />
        )}

        {/* Step 11: Character Details */}
        {currentStep === 11 && (
          <StepDetails
            name={formData.name}
            background={formData.background}
            level={formData.level}
            onChange={handleChange}
          />
        )}

        {/* Navigation Buttons */}
        <div style={styles.buttonRow}>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              style={styles.secondaryButton}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              style={{
                ...styles.primaryButton,
                opacity: isStepValid(currentStep) ? 1 : 0.4,
                cursor: isStepValid(currentStep) ? "pointer" : "not-allowed",
              }}
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isStepValid(STEPS.length)}
              style={{
                ...styles.primaryButton,
                opacity: isSubmitting || !isStepValid(STEPS.length) ? 0.4 : 1,
                cursor:
                  isSubmitting || !isStepValid(STEPS.length)
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {isSubmitting ? "Saving..." : "Finish & Create Character"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    padding: "24px",
    fontFamily: "sans-serif",
    maxWidth: "820px",
    margin: "0 auto",
    color: "#1a1a1a",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingBottom: "16px",
  },
  stepBar: {
    display: "flex",
    gap: "6px",
    marginBottom: "16px",
    overflowX: "auto",
    paddingBottom: "6px",
  },
  badgeActive: {
    padding: "6px 10px",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  badgeCompleted: {
    padding: "6px 10px",
    borderRadius: "12px",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    fontSize: "11px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  badgeUpcoming: {
    padding: "6px 10px",
    borderRadius: "12px",
    backgroundColor: "#f3f4f6",
    color: "#9ca3af",
    fontSize: "11px",
    whiteSpace: "nowrap",
  },
  formCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  stepTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#111827",
  },
  stepSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280",
  },
  methodSelector: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
  },
  methodBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    fontSize: "12px",
    cursor: "pointer",
  },
  methodBtnActive: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #2563eb",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer",
  },
  traitBox: {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#374151",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #f3f4f6",
  },
  primaryButton: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
  },
  secondaryButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};
