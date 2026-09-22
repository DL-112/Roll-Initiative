import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../types/character";
import { saveCharacter } from "../services/storage";
import { StepIndicator } from "../components/character-wizard/StepIndicator";
import { StepBasics } from "../components/character-wizard/StepBasics";
import { StepClassRace } from "../components/character-wizard/StepClassRace";
import { StepStats } from "../components/character-wizard/Stepstats";

export function CreateCharacter() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    class: "Fighter",
    race: "Human",
    level: 1,
    background: "Folk Hero",
    alignment: "True Neutral",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  });

  const isStep1Valid = formData.name.trim().length > 0;
  const isStep2Valid =
    formData.class !== "" && formData.race !== "" && formData.level >= 1;
  const isStep3Valid = Object.values(formData.stats).every(
    (val) => val >= 1 && val <= 30,
  );

  const handleNext = () => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const handleStatChange = (
    stat: keyof typeof formData.stats,
    value: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) return;

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
      alert("Error creating character.");
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
          <StepBasics formData={formData} onChange={handleChange} />
        )}

        {currentStep === 2 && (
          <StepClassRace
            selectedClass={formData.class}
            selectedRace={formData.race}
            level={formData.level}
            onSelectClass={(cls) => setFormData((p) => ({ ...p, class: cls }))}
            onSelectRace={(race) => setFormData((p) => ({ ...p, race }))}
            onChangeLevel={handleChange}
          />
        )}

        {currentStep === 3 && (
          <StepStats stats={formData.stats} onStatChange={handleStatChange} />
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

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
              style={{
                ...styles.primaryButton,
                opacity: (currentStep === 1 ? isStep1Valid : isStep2Valid)
                  ? 1
                  : 0.5,
                cursor: (currentStep === 1 ? isStep1Valid : isStep2Valid)
                  ? "pointer"
                  : "not-allowed",
              }}
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isStep3Valid}
              style={{
                ...styles.primaryButton,
                opacity: isSubmitting || !isStep3Valid ? 0.5 : 1,
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
