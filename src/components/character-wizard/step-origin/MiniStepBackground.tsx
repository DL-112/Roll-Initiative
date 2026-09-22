import { CSSProperties } from "react";

export interface BackgroundItem {
  name: string;
  description: string;
  skillProficiencies: string[];
}

export const BACKGROUNDS: BackgroundItem[] = [
  {
    name: "Acolyte",
    description:
      "You spent your life in service to a temple, learning sacred rites and providing guidance.",
    skillProficiencies: ["Insight", "Religion"],
  },
  {
    name: "Criminal",
    description:
      "You have a history of breaking the law and surviving in the underworld.",
    skillProficiencies: ["Deception", "Stealth"],
  },
  {
    name: "Folk Hero",
    description:
      "You stood up for common folk against oppression, making you a champion of the people.",
    skillProficiencies: ["Animal Handling", "Survival"],
  },
  {
    name: "Noble",
    description:
      "You were born into wealth, power, and high society privilege.",
    skillProficiencies: ["History", "Persuasion"],
  },
  {
    name: "Sage",
    description:
      "You spent years researching lore, manuscripts, and ancient secrets.",
    skillProficiencies: ["Arcana", "History"],
  },
  {
    name: "Soldier",
    description:
      "War has been your life; you have battlefield experience and military training.",
    skillProficiencies: ["Athletics", "Intimidation"],
  },
];

interface MiniStepBackgroundProps {
  selectedBackground: string;
  onSelect: (bg: string) => void;
}

export function MiniStepBackground({
  selectedBackground,
  onSelect,
}: MiniStepBackgroundProps) {
  const activeBg =
    BACKGROUNDS.find((b) => b.name === selectedBackground) || BACKGROUNDS[0];

  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.title}>1. Choose Background</h3>
        <p style={styles.subtitle}>
          Your background reveals where you came from and how you fit into the
          world.
        </p>
      </div>

      <div style={styles.layout}>
        <div style={styles.list}>
          {BACKGROUNDS.map((bg) => {
            const isSelected = selectedBackground === bg.name;
            return (
              <button
                key={bg.name}
                type="button"
                onClick={() => onSelect(bg.name)}
                style={isSelected ? styles.cardSelected : styles.card}
              >
                <span>{bg.name}</span>
                {isSelected && <span style={styles.badge}>Selected</span>}
              </button>
            );
          })}
        </div>

        <div style={styles.preview}>
          <h4 style={styles.previewTitle}>{activeBg.name}</h4>
          <p style={styles.previewDesc}>{activeBg.description}</p>
          <div>
            <span style={styles.label}>Skill Proficiencies</span>
            <div style={styles.tagRow}>
              {activeBg.skillProficiencies.map((skill) => (
                <span key={skill} style={styles.tag}>
                  {skill}
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
  previewDesc: {
    margin: 0,
    fontSize: "13px",
    color: "#4b5563",
    lineHeight: "1.4",
  },
  label: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  tagRow: { display: "flex", gap: "6px", marginTop: "6px" },
  tag: {
    fontSize: "12px",
    padding: "3px 8px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    borderRadius: "12px",
  },
};
