import { CSSProperties } from "react";

export interface SpeciesItem {
  name: string;
  speed: string;
  traits: string[];
}

export const SPECIES_LIST: SpeciesItem[] = [
  {
    name: "Dragonborn",
    speed: "30 ft",
    traits: ["Breath Weapon", "Damage Resistance"],
  },
  {
    name: "Dwarf",
    speed: "25 ft",
    traits: ["Darkvision", "Dwarven Resilience"],
  },
  {
    name: "Elf",
    speed: "30 ft",
    traits: ["Darkvision", "Fey Ancestry", "Keen Senses"],
  },
  { name: "Gnome", speed: "25 ft", traits: ["Darkvision", "Gnome Cunning"] },
  {
    name: "Half-Elf",
    speed: "30 ft",
    traits: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
  },
  {
    name: "Half-Orc",
    speed: "30 ft",
    traits: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
  },
  {
    name: "Halfling",
    speed: "25 ft",
    traits: ["Lucky", "Brave", "Halfling Nimbleness"],
  },
  { name: "Human", speed: "30 ft", traits: ["Versatile", "Extra Language"] },
  {
    name: "Tiefling",
    speed: "30 ft",
    traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
  },
];

interface MiniStepSpeciesProps {
  selectedSpecies: string;
  onSelect: (species: string) => void;
}

export function MiniStepSpecies({
  selectedSpecies,
  onSelect,
}: MiniStepSpeciesProps) {
  const activeSpecies =
    SPECIES_LIST.find((s) => s.name === selectedSpecies) || SPECIES_LIST[0];

  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.title}>3. Choose Species</h3>
        <p style={styles.subtitle}>
          Select your character species to determine speed and innate traits.
        </p>
      </div>

      <div style={styles.layout}>
        <div style={styles.list}>
          {SPECIES_LIST.map((sp) => {
            const isSelected = selectedSpecies === sp.name;
            return (
              <button
                key={sp.name}
                type="button"
                onClick={() => onSelect(sp.name)}
                style={isSelected ? styles.cardSelected : styles.card}
              >
                <span>{sp.name}</span>
                {isSelected && <span style={styles.badge}>Selected</span>}
              </button>
            );
          })}
        </div>

        <div style={styles.preview}>
          <h4 style={styles.previewTitle}>{activeSpecies.name}</h4>
          <div>
            <span style={styles.label}>Movement Speed</span>
            <div style={styles.value}>{activeSpecies.speed}</div>
          </div>
          <div>
            <span style={styles.label}>Racial Traits</span>
            <div style={styles.tagRow}>
              {activeSpecies.traits.map((trait) => (
                <span key={trait} style={styles.tag}>
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { display: "flex", flexDirection: "column", gap: "16px" },
  title: { margin: 0, fontSize: "18px", color: "#111827" },
  subtitle: { margin: "4px 0 0 0", fontSize: "13px", color: "#6b7280" },
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
    gap: "8px",
    alignContent: "start",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    fontSize: "13px",
    textAlign: "left",
  },
  cardSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "2px solid #2563eb",
    backgroundColor: "#eff6ff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#1d4ed8",
    textAlign: "left",
  },
  badge: {
    fontSize: "10px",
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "2px 5px",
    borderRadius: "10px",
  },
  preview: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  previewTitle: { margin: 0, fontSize: "18px", color: "#1f2937" },
  label: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  value: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    marginTop: "2px",
  },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" },
  tag: {
    fontSize: "12px",
    padding: "3px 8px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    borderRadius: "12px",
  },
};
