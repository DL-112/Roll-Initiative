import { CSSProperties } from "react";

interface StepSpeciesTraitsProps {
  selectedSpecies: string;
  selectedTraits: string[];
  onToggleTrait: (trait: string) => void;
}

const SPECIES_OPTIONS: Record<string, string[]> = {
  Human: [
    "Versatile (+1 Skill Proficiency)",
    "Resourceful (Heroic Inspiration)",
    "Extra Language Proficiency",
  ],
  Elf: [
    "Darkvision (60 ft)",
    "Fey Ancestry (Advantage vs Charm)",
    "Keen Senses (Perception)",
  ],
  Dwarf: [
    "Dwarven Resiliency (Poison Advantage)",
    "Stonecunning",
    "Dwarven Toughness (+1 HP/level)",
  ],
  Halfling: [
    "Lucky (Reroll 1s)",
    "Brave (Advantage vs Frightened)",
    "Halfling Nimbleness",
  ],
};

export function StepSpeciesTraits({
  selectedSpecies,
  selectedTraits,
  onToggleTrait,
}: StepSpeciesTraitsProps) {
  const options = SPECIES_OPTIONS[selectedSpecies] || [
    "Standard Ancestry Traits",
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Species Traits ({selectedSpecies})</h2>
      <p style={styles.subtitle}>
        Select innate abilities and lineage features for {selectedSpecies}.
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
