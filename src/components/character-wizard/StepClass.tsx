const CLASSES = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

interface StepClassProps {
  selectedClass: string;
  onSelectClass: (cls: string) => void;
}

export function StepClass({ selectedClass, onSelectClass }: StepClassProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 1: Choose Class</h2>
      <div style={styles.gridSelector}>
        {CLASSES.map((cls) => (
          <button
            type="button"
            key={cls}
            onClick={() => onSelectClass(cls)}
            style={
              selectedClass === cls ? styles.optionSelected : styles.optionCard
            }
          >
            {cls}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  stepContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  gridSelector: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
    gap: "10px",
  },
  optionCard: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    fontSize: "14px",
  },
  optionSelected: {
    padding: "12px",
    borderRadius: "6px",
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },
};
