import { CSSProperties } from "react";

const EQUIPMENT_OPTIONS = [
  "Explorer Pack (Bedroll, Rations, Rope)",
  "Dungeoneer Pack (Torches, Tinderbox, Pitons)",
  "Scholar Pack (Book, Ink, Parchment)",
  "Leather Armor & Dagger",
  "Chain Mail & Shield",
  "Component Pouch & Arcane Focus",
];

interface MiniStepEquipmentProps {
  selectedEquipment: string[];
  onChange: (equipment: string[]) => void;
}

export function MiniStepEquipment({
  selectedEquipment,
  onChange,
}: MiniStepEquipmentProps) {
  const toggleEquipment = (item: string) => {
    if (selectedEquipment.includes(item)) {
      onChange(selectedEquipment.filter((e) => e !== item));
    } else {
      onChange([...selectedEquipment, item]);
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.title}>2. Starting Equipment</h3>
        <p style={styles.subtitle}>
          Select the gear and kit your character carries on their journey.
        </p>
      </div>

      <div style={styles.grid}>
        {EQUIPMENT_OPTIONS.map((item) => {
          const isChecked = selectedEquipment.includes(item);
          return (
            <label
              key={item}
              style={isChecked ? styles.optionChecked : styles.option}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleEquipment(item)}
                style={styles.checkbox}
              />
              <span style={styles.text}>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { display: "flex", flexDirection: "column", gap: "16px" },
  title: { margin: 0, fontSize: "18px", color: "#111827" },
  subtitle: { margin: "4px 0 0 0", fontSize: "13px", color: "#6b7280" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "10px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
  },
  optionChecked: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #3b82f6",
    backgroundColor: "#eff6ff",
    cursor: "pointer",
  },
  checkbox: { width: "16px", height: "16px", cursor: "pointer" },
  text: { fontSize: "13px", color: "#1f2937" },
};
