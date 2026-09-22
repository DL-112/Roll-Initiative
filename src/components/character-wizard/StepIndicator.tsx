interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  "1. Class",
  "2. Origin",
  "3. Stats",
  "4. Alignment",
  "5. Details",
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div style={styles.stepper}>
      {STEPS.map((label, index) => {
        const stepNum = index + 1;
        const isActive = currentStep >= stepNum;
        return (
          <div key={label} style={styles.stepWrapper}>
            <div style={isActive ? styles.stepActive : styles.stepInactive}>
              {label}
            </div>
            {index < STEPS.length - 1 && <div style={styles.stepDivider} />}
          </div>
        );
      })}
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
  stepWrapper: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  stepActive: {
    fontWeight: "bold",
    color: "#3b82f6",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "4px",
    whiteSpace: "nowrap" as const,
    fontSize: "13px",
  },
  stepInactive: {
    color: "#9ca3af",
    whiteSpace: "nowrap" as const,
    fontSize: "13px",
  },
  stepDivider: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "0 8px",
  },
};
