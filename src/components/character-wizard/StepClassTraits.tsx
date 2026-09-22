import { CSSProperties } from "react";

interface StepClassTraitsProps {
  selectedClass: string;
  selectedTraits: string[];
  onToggleTrait: (trait: string) => void;
}

const CLASS_OPTIONS: Record<string, string[]> = {
  Fighter: [
    "Archery (+2 to ranged attacks)",
    "Defense (+1 AC in armor)",
    "Dueling (+2 damage with one-handed weapon)",
    "Great Weapon Fighting",
  ],
  Wizard: ["Arcane Recovery", "Cantrip Formulas", "Spellbook Specialization"],
  Rogue: [
    "Expertise in Stealth",
    "Expertise in Sleight of Hand",
    "Thieves' Cant",
  ],
  Cleric: ["Divine Domain Focus", "Bonus Cantrip", "Heavy Armor Proficiency"],
};

export function StepClassTraits({
  selectedClass,
  selectedTraits,
  onToggleTrait,
}: StepClassTraitsProps) {
  const options = CLASS_OPTIONS[selectedClass] || [
    "Standard Class Training",
    "Core Feature Focus",
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Core Class Features ({selectedClass})</h2>
      <p style={styles.subtitle}>
        Configure initial traits and specialization for your chosen class.
      </p>

      <div style={styles.list}>
        {options.map((option) => {
          const isSelected = selectedTraits.includes(option);
          return (
            <label
              key={option}
              style={isSelected ? styles.cardActive : styles.card}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleTrait(option)}
                style={{ marginRight: "10px" }}
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { display: "flex", flexDirection: "column", gap: "12px" },
  title: { margin: 0, fontSize: "18px", color: "#111827" },
  subtitle: { margin: 0, fontSize: "13px", color: "#6b7280" },
  list: { display: "flex", flexDirection: "column", gap: "8px" },
  card: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  cardActive: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #2563eb",
    backgroundColor: "#eff6ff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};
