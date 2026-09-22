interface StepDetailsProps {
  name: string;
  background: string;
  level: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StepDetails({
  name,
  background,
  level,
  onChange,
}: StepDetailsProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 5: Character Details</h2>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Character Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="e.g. Drizzt Do'Urden"
          style={styles.input}
          autoFocus
        />
      </div>

      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Background</label>
          <input
            type="text"
            name="background"
            value={background}
            onChange={onChange}
            placeholder="e.g. Folk Hero"
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Starting Level</label>
          <input
            type="number"
            name="level"
            min={1}
            max={20}
            value={level}
            onChange={onChange}
            style={styles.input}
          />
        </div>
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
  row: { display: "flex", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column" as const, flex: 1 },
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
};
