interface StepStatsProps {
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  onStatChange: (stat: keyof StepStatsProps["stats"], value: number) => void;
}

export function StepStats({ stats, onStatChange }: StepStatsProps) {
  return (
    <div style={styles.stepContent}>
      <h2>Step 3: Assign Ability Scores</h2>
      <div style={styles.statsGrid}>
        {(Object.keys(stats) as Array<keyof typeof stats>).map((stat) => (
          <div key={stat} style={styles.statBox}>
            <label style={{ ...styles.label, textTransform: "capitalize" }}>
              {stat}
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={stats[stat]}
              onChange={(e) => onStatChange(stat, Number(e.target.value))}
              style={styles.statInput}
            />
          </div>
        ))}
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
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#374151",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "12px",
  },
  statBox: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  statInput: {
    width: "50px",
    textAlign: "center" as const,
    padding: "6px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
};
