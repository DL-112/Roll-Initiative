import { CSSProperties } from "react";

interface MiniStepBackstoryProps {
  backstory: string;
  onChange: (story: string) => void;
}

export function MiniStepBackstory({
  backstory,
  onChange,
}: MiniStepBackstoryProps) {
  return (
    <div style={styles.container}>
      <div>
        <h3 style={styles.title}>4. Imagine Past & Present</h3>
        <p style={styles.subtitle}>
          Write a short story or notes about who you were and what drives you
          today.
        </p>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Backstory & Personality</label>
        <textarea
          value={backstory}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Where did you grow up? Who are your allies or rivals? Why are you adventuring?"
          rows={6}
          style={styles.textarea}
        />
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { display: "flex", flexDirection: "column", gap: "16px" },
  title: { margin: 0, fontSize: "18px", color: "#111827" },
  subtitle: { margin: "4px 0 0 0", fontSize: "13px", color: "#6b7280" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "bold", color: "#374151" },
  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    lineHeight: "1.5",
    resize: "vertical",
    fontFamily: "inherit",
  },
};
