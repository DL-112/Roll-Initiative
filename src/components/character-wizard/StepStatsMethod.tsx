import { CSSProperties } from "react";
import { StepStats } from "./StepStats";

export type StatMethod = "Standard Array" | "Random Generation" | "Point Cost";

// 1. Define the exact Stats interface required by StepStats
export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface StepStatsMethodProps {
  method: StatMethod;
  onSelectMethod: (method: StatMethod) => void;
  stats: Stats; // 2. Update type here from Record<string, number> to Stats
  onStatChange: (stat: string, value: number) => void;
}

export function StepStatsMethod({
  method,
  onSelectMethod,
  stats,
  onStatChange,
}: StepStatsMethodProps) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ability Scores</h2>
      <p style={styles.subtitle}>
        Choose how you want to generate your character's ability scores.
      </p>

      <div style={styles.methodGroup}>
        {(
          ["Standard Array", "Random Generation", "Point Cost"] as StatMethod[]
        ).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onSelectMethod(m)}
            style={method === m ? styles.activeMethod : styles.method}
          >
            {m}
          </button>
        ))}
      </div>

      <StepStats stats={stats} onStatChange={onStatChange} />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { display: "flex", flexDirection: "column", gap: "12px" },
  title: { margin: 0, fontSize: "18px", color: "#111827" },
  subtitle: { margin: 0, fontSize: "13px", color: "#6b7280" },
  methodGroup: { display: "flex", gap: "8px", marginBottom: "8px" },
  method: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },
  activeMethod: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #2563eb",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
  },
};
