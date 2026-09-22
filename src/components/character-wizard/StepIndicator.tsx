interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div style={styles.stepper}>
      <div style={currentStep >= 1 ? styles.stepActive : styles.stepInactive}>
        1. Basics
      </div>
      <div style={styles.stepDivider} />
      <div style={currentStep >= 2 ? styles.stepActive : styles.stepInactive}>
        2. Class & Race
      </div>
      <div style={styles.stepDivider} />
      <div style={currentStep >= 3 ? styles.stepActive : styles.stepInactive}>
        3. Ability Scores
      </div>
    </div>
  );
}

const styles = {
  stepper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "16px 0 24px 0",
  },
  stepActive: {
    fontWeight: "bold",
    color: "#3b82f6",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "4px",
  },
  stepInactive: {
    color: "#9ca3af",
  },
  stepDivider: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "0 12px",
  },
};
