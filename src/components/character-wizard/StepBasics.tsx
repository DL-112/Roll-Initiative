interface StepBasicsProps {
  formData: {
    name: string;
    background: string;
    alignment: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StepBasics({ formData, onChange }: StepBasicsProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 1: Character Identity</h2>
      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Character Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="e.g. Thorin Oakenshield"
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
            value={formData.background}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Alignment</label>
          <input
            type="text"
            name="alignment"
            value={formData.alignment}
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
  row: {
    display: "flex",
    gap: "16px",
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
};
