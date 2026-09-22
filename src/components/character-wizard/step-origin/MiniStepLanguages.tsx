import { CSSProperties } from "react";

const LANGUAGES = [
  "Common",
  "Dwarvish",
  "Elvish",
  "Giant",
  "Gnomish",
  "Goblin",
  "Halfling",
  "Orc",
  "Abyssal",
  "Celestial",
  "Draconic",
  "Infernal",
];

interface MiniStepLanguagesProps {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
}

export function MiniStepLanguages({
  selectedLanguages,
  onChange,
}: MiniStepLanguagesProps) {
  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      onChange(selectedLanguages.filter((l) => l !== lang));
    } else {
      onChange([...selectedLanguages, lang]);
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.title}>5. Choose Languages</h3>
        <p style={styles.subtitle}>
          Select the languages your character can speak, read, and write.
        </p>
      </div>

      <div style={styles.grid}>
        {LANGUAGES.map((lang) => {
          const isChecked = selectedLanguages.includes(lang);
          return (
            <label
              key={lang}
              style={isChecked ? styles.optionChecked : styles.option}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleLanguage(lang)}
                style={styles.checkbox}
              />
              <span style={styles.text}>{lang}</span>
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
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: "10px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
  },
  optionChecked: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #3b82f6",
    backgroundColor: "#eff6ff",
    cursor: "pointer",
  },
  checkbox: { width: "15px", height: "15px", cursor: "pointer" },
  text: { fontSize: "13px", color: "#1f2937", fontWeight: 500 },
};
