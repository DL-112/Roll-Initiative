const ALIGNMENTS = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
];

interface StepAlignmentProps {
  selectedAlignment: string;
  onSelectAlignment: (alignment: string) => void;
}

export function StepAlignment({
  selectedAlignment,
  onSelectAlignment,
}: StepAlignmentProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 4: Choose Alignment</h2>
      <div style={styles.gridSelector}>
        {ALIGNMENTS.map((align) => (
          <button
            type="button"
            key={align}
            onClick={() => onSelectAlignment(align)}
            style={
              selectedAlignment === align
                ? styles.optionSelected
                : styles.optionCard
            }
          >
            {align}
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
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  optionCard: {
    padding: "16px 8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    fontSize: "14px",
  },
  optionSelected: {
    padding: "16px 8px",
    borderRadius: "6px",
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },
};
