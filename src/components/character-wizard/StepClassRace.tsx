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

interface StepClassRaceProps {
  selectedClass: string;
  selectedRace: string;
  level: number;
  onSelectClass: (cls: string) => void;
  onSelectRace: (race: string) => void;
  onChangeLevel: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StepClassRace({
  selectedClass,
  selectedRace,
  level,
  onSelectClass,
  onSelectRace,
  onChangeLevel,
}: StepClassRaceProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 2: Class & Race</h2>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Select Class</label>
        <div style={styles.gridSelector}>
          {CLASSES.map((cls) => (
            <button
              type="button"
              key={cls}
              onClick={() => onSelectClass(cls)}
              style={
                selectedClass === cls
                  ? styles.optionSelected
                  : styles.optionCard
              }
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Select Race</label>
        <div style={styles.gridSelector}>
          {RACES.map((race) => (
            <button
              type="button"
              key={race}
              onClick={() => onSelectRace(race)}
              style={
                selectedRace === race
                  ? styles.optionSelected
                  : styles.optionCard
              }
            >
              {race}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>Starting Level</label>
        <input
          type="number"
          name="level"
          min={1}
          max={20}
          value={level}
          onChange={onChangeLevel}
          style={{ ...styles.input, maxWidth: "120px" }}
        />
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
  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#374151",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
  },
  gridSelector: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "8px",
  },
  optionCard: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center" as const,
  },
  optionSelected: {
    padding: "10px",
    borderRadius: "6px",
    border: "2px solid #3b82f6",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center" as const,
  },
};
