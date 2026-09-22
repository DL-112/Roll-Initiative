import { useState, CSSProperties } from "react";
import { MiniStepBackground } from "./step-origin/MiniStepBackground";
import { MiniStepEquipment } from "./step-origin/MiniStepEquipment";
import { MiniStepSpecies } from "./step-origin/MiniStepSpecies";
import { MiniStepBackstory } from "./step-origin/MiniStepBackstory";
import { MiniStepLanguages } from "./step-origin/MiniStepLanguages";

export interface OriginData {
  background: string;
  equipment: string[];
  species: string;
  backstory: string;
  languages: string[];
}

interface StepOriginProps {
  originData: OriginData;
  onChange: (data: Partial<OriginData>) => void;
}

const MINI_STEPS = [
  "1. Background",
  "2. Equipment",
  "3. Species",
  "4. Past & Present",
  "5. Languages",
];

export function StepOrigin({ originData, onChange }: StepOriginProps) {
  const [subStep, setSubStep] = useState<number>(1);
  const [maxUnlockedSubStep, setMaxUnlockedSubStep] = useState<number>(1);

  // Validate each sub-step independently
  const isSubStepValid = (step: number) => {
    switch (step) {
      case 1:
        return originData.background.trim().length > 0;
      case 2:
        return originData.equipment.length > 0;
      case 3:
        return originData.species.trim().length > 0;
      case 4:
        return originData.backstory.trim().length >= 5;
      case 5:
        return originData.languages.length > 0;
      default:
        return false;
    }
  };

  const handleNextSubStep = () => {
    if (!isSubStepValid(subStep)) return;
    const next = subStep + 1;
    setSubStep(next);
    if (next > maxUnlockedSubStep) {
      setMaxUnlockedSubStep(next);
    }
  };

  const handlePrevSubStep = () => {
    setSubStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectSubStep = (stepNum: number) => {
    // Only allow clicking steps that are unlocked/previously reached
    if (stepNum <= maxUnlockedSubStep) {
      setSubStep(stepNum);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sub-step Progress Indicator */}
      <div style={styles.subStepper}>
        {MINI_STEPS.map((label, index) => {
          const stepNum = index + 1;
          const isActive = subStep === stepNum;
          const isUnlocked = stepNum <= maxUnlockedSubStep;

          let btnStyle = styles.subStepInactive;
          if (isActive) btnStyle = styles.subStepActive;
          else if (!isUnlocked) btnStyle = styles.subStepDisabled;

          return (
            <button
              key={label}
              type="button"
              disabled={!isUnlocked}
              onClick={() => handleSelectSubStep(stepNum)}
              style={btnStyle}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Current Mini-step view */}
      <div style={styles.contentArea}>
        {subStep === 1 && (
          <MiniStepBackground
            selectedBackground={originData.background}
            onSelect={(bg) => onChange({ background: bg })}
          />
        )}
        {subStep === 2 && (
          <MiniStepEquipment
            selectedEquipment={originData.equipment}
            onChange={(equip) => onChange({ equipment: equip })}
          />
        )}
        {subStep === 3 && (
          <MiniStepSpecies
            selectedSpecies={originData.species}
            onSelect={(sp) => onChange({ species: sp })}
          />
        )}
        {subStep === 4 && (
          <MiniStepBackstory
            backstory={originData.backstory}
            onChange={(story) => onChange({ backstory: story })}
          />
        )}
        {subStep === 5 && (
          <MiniStepLanguages
            selectedLanguages={originData.languages}
            onChange={(langs) => onChange({ languages: langs })}
          />
        )}
      </div>

      {/* Internal Mini-step Navigation Controls */}
      <div style={styles.navRow}>
        <button
          type="button"
          disabled={subStep === 1}
          onClick={handlePrevSubStep}
          style={{
            ...styles.navButton,
            opacity: subStep === 1 ? 0.4 : 1,
            cursor: subStep === 1 ? "not-allowed" : "pointer",
          }}
        >
          ← Previous Sub-step
        </button>

        {subStep < 5 ? (
          <button
            type="button"
            disabled={!isSubStepValid(subStep)}
            onClick={handleNextSubStep}
            style={{
              ...styles.navButtonPrimary,
              opacity: isSubStepValid(subStep) ? 1 : 0.4,
              cursor: isSubStepValid(subStep) ? "pointer" : "not-allowed",
            }}
          >
            Next Sub-step →
          </button>
        ) : (
          <span style={styles.completeNotice}>
            {isSubStepValid(5)
              ? '✓ Origin Complete! Click "Next Step" below.'
              : "Please select at least 1 language."}
          </span>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  subStepper: {
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "12px",
    overflowX: "auto",
  },
  subStepActive: {
    padding: "6px 12px",
    borderRadius: "16px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    fontWeight: "bold",
    fontSize: "12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  subStepInactive: {
    padding: "6px 12px",
    borderRadius: "16px",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  subStepDisabled: {
    padding: "6px 12px",
    borderRadius: "16px",
    backgroundColor: "#f3f4f6",
    color: "#9ca3af",
    border: "none",
    fontSize: "12px",
    cursor: "not-allowed",
    whiteSpace: "nowrap",
  },
  contentArea: {
    minHeight: "260px",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #f3f4f6",
  },
  navButton: {
    padding: "8px 14px",
    fontSize: "13px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#374151",
  },
  navButtonPrimary: {
    padding: "8px 14px",
    fontSize: "13px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: 600,
  },
  completeNotice: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#059669",
  },
};
