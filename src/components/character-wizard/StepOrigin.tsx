const RACES = [
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Half-Elf",
  "Half-Orc",
  "Halfling",
  "Human",
  "Tiefling",
];

interface StepOriginProps {
  selectedRace: string;
  onSelectRace: (race: string) => void;
}

export function StepOrigin({ selectedRace, onSelectRace }: StepOriginProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 2: Choose Character Origin</h2>
      <div style={styles.gridSelector}>
        {RACES.map((race) => (
          <button
            type="button"
            key={race}
            onClick={() => onSelectRace(race)}
            style={
              selectedRace === race ? styles.optionSelected : styles.optionCard
            }
          >
            {race}
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
