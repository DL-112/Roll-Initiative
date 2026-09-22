import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../types/character";
import { saveCharacter } from "../services/storage";
import { StepIndicator } from "../components/character-wizard/StepIndicator";
import { StepClass } from "../components/character-wizard/StepClass";
import { StepOrigin } from "../components/character-wizard/StepOrigin";
import { StepStats } from "../components/character-wizard/StepStats";
import { StepAlignment } from "../components/character-wizard/StepAlignment";
import { StepDetails } from "../components/character-wizard/StepDetails";

export function CreateCharacter() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    class: "Fighter",
    race: "Human",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    alignment: "True Neutral",
    name: "",
    background: "Folk Hero",
    level: 1,
  });

  // Step validation check (Step 5 requires character name)
  const isStepValid = (step: number) => {
    if (step === 1) return formData.class !== "";
    if (step === 2) return formData.race !== "";
    if (step === 3)
      return Object.values(formData.stats).every((v) => v >= 1 && v <= 30);
    if (step === 4) return formData.alignment !== "";
    if (step === 5) return formData.name.trim().length > 0;
    return true;
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, 5));
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
    if (!isStepValid(5)) return;

    try {
      setIsSubmitting(true);
      const newCharacter: Character = {
        id: Date.now().toString(),
        ...formData,
      };

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

      <StepIndicator currentStep={currentStep} />

      <form onSubmit={handleSubmit} style={styles.formCard}>
        {currentStep === 1 && (
          <StepClass
            selectedClass={formData.class}
            onSelectClass={(cls) => setFormData((p) => ({ ...p, class: cls }))}
          />
        )}

        {currentStep === 2 && (
          <StepOrigin
            selectedRace={formData.race}
            onSelectRace={(race) => setFormData((p) => ({ ...p, race }))}
          />
        )}

        {currentStep === 3 && (
          <StepStats
            stats={formData.stats}
            onStatChange={(stat, value) =>
              setFormData((p) => ({
                ...p,
                stats: { ...p.stats, [stat]: value },
              }))
            }
          />
        )}

        {currentStep === 4 && (
          <StepAlignment
            selectedAlignment={formData.alignment}
            onSelectAlignment={(alignment) =>
              setFormData((p) => ({ ...p, alignment }))
            }
          />
        )}

        {currentStep === 5 && (
          <StepDetails
            name={formData.name}
            background={formData.background}
            level={formData.level}
            onChange={handleChange}
          />
        )}

        <div style={styles.buttonRow}>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              style={styles.secondaryButton}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              style={{
                ...styles.primaryButton,
                opacity: isStepValid(currentStep) ? 1 : 0.5,
                cursor: isStepValid(currentStep) ? "pointer" : "not-allowed",
              }}
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isStepValid(5)}
              style={{
                ...styles.primaryButton,
                opacity: isSubmitting || !isStepValid(5) ? 0.5 : 1,
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

const styles = {
  container: {
    padding: "24px",
    fontFamily: "sans-serif",
    maxWidth: "720px",
    margin: "0 auto",
    color: "#1a1a1a",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingBottom: "16px",
  },
  formCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
    backgroundColor: "#3b82f6",
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
